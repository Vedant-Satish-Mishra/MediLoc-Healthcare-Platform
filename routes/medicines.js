const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Helper function to get database connection
async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

// Helper to find owner ID from user ID
async function getOwnerIdByUserId(connection, userId) {
    const [rows] = await connection.execute('SELECT id FROM owners WHERE user_id = ?', [userId]);
    if (rows.length === 0) return null;
    return rows[0].id;
}

// 1. --- PUBLIC SEARCH ROUTE ---
router.get('/', async (req, res) => {
    const query = req.query.q || '';
    let connection;
    try {
        connection = await getConnection();
        
        // Search by medicine name or shop name
        const searchQuery = `%${query}%`;
        const sql = `
            SELECT m.id, m.name, m.category, m.price, m.discount, m.stock, 
                   o.shop_name, o.license_number, 
                   u.fullname as owner_name, u.phone as owner_phone, u.address as shop_address, u.pincode as shop_pincode
            FROM medicines m
            JOIN owners o ON m.owner_id = o.id
            JOIN users u ON o.user_id = u.id
            WHERE m.name LIKE ? OR o.shop_name LIKE ?
            ORDER BY m.name ASC
        `;
        const [rows] = await connection.execute(sql, [searchQuery, searchQuery]);
        res.json(rows);
    } catch (error) {
        console.error('Search Medicines Error:', error);
        res.status(500).json({ message: 'Server error searching medicines.' });
    } finally {
        if (connection) await connection.end();
    }
});

// 2. --- GET OWNER MEDICINES ROUTE ---
router.get('/owner', async (req, res) => {
    const userId = req.headers['x-user-id'] || req.query.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    let connection;
    try {
        connection = await getConnection();
        const ownerId = await getOwnerIdByUserId(connection, userId);
        if (!ownerId) {
            return res.status(404).json({ message: 'Owner profile not found.' });
        }

        const [rows] = await connection.execute('SELECT * FROM medicines WHERE owner_id = ? ORDER BY name ASC', [ownerId]);
        res.json(rows);
    } catch (error) {
        console.error('Fetch Owner Medicines Error:', error);
        res.status(500).json({ message: 'Server error retrieving medicines.' });
    } finally {
        if (connection) await connection.end();
    }
});

// 3. --- ADD MEDICINE ROUTE ---
router.post('/owner', async (req, res) => {
    const { name, category, price, stock, discount, userId } = req.body;

    if (!name || !category || price === undefined || stock === undefined || !userId) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    let connection;
    try {
        connection = await getConnection();
        const ownerId = await getOwnerIdByUserId(connection, userId);
        if (!ownerId) {
            return res.status(404).json({ message: 'Owner profile not found.' });
        }

        // Check if medicine already exists for this owner
        const [existing] = await connection.execute(
            'SELECT id FROM medicines WHERE owner_id = ? AND LOWER(name) = LOWER(?)', 
            [ownerId, name.trim()]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Medicine with this name already exists in your inventory.' });
        }

        const disc = discount || 0;
        await connection.execute(
            'INSERT INTO medicines (owner_id, name, category, price, discount, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [ownerId, name.trim(), category.trim(), price, disc, stock]
        );

        res.status(201).json({ message: 'Medicine added successfully!' });
    } catch (error) {
        console.error('Add Medicine Error:', error);
        res.status(500).json({ message: 'Server error adding medicine.' });
    } finally {
        if (connection) await connection.end();
    }
});

// 4. --- UPDATE MEDICINE ROUTE ---
router.put('/owner/:id', async (req, res) => {
    const medId = req.params.id;
    const { price, stock, discount, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    let connection;
    try {
        connection = await getConnection();
        const ownerId = await getOwnerIdByUserId(connection, userId);
        if (!ownerId) {
            return res.status(404).json({ message: 'Owner profile not found.' });
        }

        // Verify ownership
        const [existing] = await connection.execute('SELECT * FROM medicines WHERE id = ? AND owner_id = ?', [medId, ownerId]);
        if (existing.length === 0) {
            return res.status(403).json({ message: 'Access denied or medicine not found.' });
        }

        const updatedPrice = price !== undefined ? price : existing[0].price;
        const updatedStock = stock !== undefined ? stock : existing[0].stock;
        const updatedDiscount = discount !== undefined ? discount : existing[0].discount;

        await connection.execute(
            'UPDATE medicines SET price = ?, stock = ?, discount = ? WHERE id = ?',
            [updatedPrice, updatedStock, updatedDiscount, medId]
        );

        res.json({ message: 'Medicine updated successfully!' });
    } catch (error) {
        console.error('Update Medicine Error:', error);
        res.status(500).json({ message: 'Server error updating medicine.' });
    } finally {
        if (connection) await connection.end();
    }
});

// 5. --- DELETE MEDICINE ROUTE ---
router.delete('/owner/:id', async (req, res) => {
    const medId = req.params.id;
    const userId = req.headers['x-user-id'] || req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    let connection;
    try {
        connection = await getConnection();
        const ownerId = await getOwnerIdByUserId(connection, userId);
        if (!ownerId) {
            return res.status(404).json({ message: 'Owner profile not found.' });
        }

        // Verify ownership
        const [existing] = await connection.execute('SELECT id FROM medicines WHERE id = ? AND owner_id = ?', [medId, ownerId]);
        if (existing.length === 0) {
            return res.status(403).json({ message: 'Access denied or medicine not found.' });
        }

        await connection.execute('DELETE FROM medicines WHERE id = ?', [medId]);
        res.json({ message: 'Medicine deleted successfully!' });
    } catch (error) {
        console.error('Delete Medicine Error:', error);
        res.status(500).json({ message: 'Server error deleting medicine.' });
    } finally {
        if (connection) await connection.end();
    }
});

module.exports = router;

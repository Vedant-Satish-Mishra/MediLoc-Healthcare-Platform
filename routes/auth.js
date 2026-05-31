const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const router = express.Router();

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// --- REGISTRATION ROUTE ---
router.post('/register', async (req, res) => {
    const { fullname, email, phone, password, address, pincode, role, shopName, license } = req.body;

    // Basic validation
    if (!fullname || !email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        await connection.beginTransaction(); // Start transaction

        // Check if user already exists
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert into users table
        const [userResult] = await connection.execute(
            'INSERT INTO users (fullname, email, phone, password, address, pincode, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [fullname, email, phone, hashedPassword, address, pincode, role]
        );

        const newUserId = userResult.insertId;

        // If the role is 'owner', insert into owners table
        if (role === 'owner') {
            if (!shopName || !license) {
                await connection.rollback(); // Rollback if owner fields are missing
                return res.status(400).json({ message: 'Shop name and license are required for owners.' });
            }
            await connection.execute(
                'INSERT INTO owners (user_id, shop_name, license_number) VALUES (?, ?, ?)',
                [newUserId, shopName, license]
            );
        }

        await connection.commit(); // Commit the transaction
        res.status(201).json({ message: 'Registration successful! You can now log in.' });

    } catch (error) {
        if (connection) await connection.rollback(); // Rollback on error
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    } finally {
        if (connection) await connection.end();
    }
});


// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Find user by email and role
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ? AND role = ?', [email, role.toLowerCase()]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Invalid credentials or role mismatch.' });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // On successful login
        res.status(200).json({ message: 'Login successful!', user: { id: user.id, fullname: user.fullname, email: user.email, role: user.role } });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


module.exports = router;

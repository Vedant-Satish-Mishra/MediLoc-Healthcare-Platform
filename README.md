# MediLoc - Medical Store Management & Medicine Locator System

MediLoc is a full-stack web application designed to connect patients and local pharmacies. It allows customers to search for medicines in nearby shops in real time, and provides pharmacy owners with a dedicated inventory dashboard to manage their stock, prices, discounts, and shop details.

---

## 🚀 Features

### For Customers (Public Search)
- **Interactive Search:** Search for medicines by name or filter by pharmacy name.
- **Real-time Inventory Check:** View details of the pharmacy, medicine availability, price, and discounts.
- **Shop Details:** View address, pincode, and contact number for matching pharmacies.
- **Responsive & Modern Design:** Stylized with Tailwind CSS, AOS (Animate On Scroll), and custom glassmorphism panels.

### For Pharmacy Owners (Dashboard)
- **Role-based Authentication:** Secure registration and login for store owners.
- **Inventory Control:** Add new medicines, set pricing, assign discounts, and delete records.
- **Interactive Stock Adjustments:** Increment or decrement stock quantities with live validation.
- **Quick Statistics:** View key metrics such as Active Medicines count, Average Price, and Low Stock Alerts (&lt; 20 units).
- **Auto-Notifications:** Warns owners immediately if any medicine's stock falls below a threshold.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (via CDN), AOS (Animations), Feather Icons.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL (`mysql2` with promise wrapper).
- **Security:** Hashing passwords using `bcryptjs`.

---

## 📂 Project Structure

```text
MEDILOC/
├── routes/
│   ├── auth.js            # User registration and login routing
│   └── medicines.js       # Search and owner inventory management routing
├── public/
│   ├── index.html         # Main search and visitor landing page
│   ├── login.html         # Role-based sign-in
│   ├── registration.html  # Role-based sign-up (Customer / Owner)
│   ├── dashboard.html     # Owner inventory dashboard
│   ├── intro.html         # Splash intro redirect page
│   ├── intro.mp4          # Video asset for intro
│   └── [images]           # Brand and product placeholder images
├── database.sql           # Database schema definition file
├── server.js              # Node/Express server entry point
├── .env                   # Configuration file (ignored by Git)
├── package.json           # Node project metadata and dependencies
└── README.md              # Documentation
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MySQL Server](https://dev.mysql.com/downloads/installer/) running locally or hosted

### 1. Database Setup
1. Log in to your MySQL shell or query editor (e.g., MySQL Workbench, phpMyAdmin).
2. Execute the queries inside the `database.sql` file to create the database (`mydatabase`) and tables (`users`, `owners`, `medicines`):
   ```bash
   mysql -u root -p < database.sql
   ```

### 2. Environment Configuration
Create a `.env` file in the root of the `MEDILOC` folder and specify your port and database credentials:
```env
PORT=8080
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydatabase
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

### 3. Installation
Navigate to the `MEDILOC` folder and install project dependencies:
```bash
npm install
```

### 4. Running the Server
Start the Express server:
```bash
npm start
```
The server will boot up and log:
```bash
🚀 Server is running on http://localhost:8080
```
Open `http://localhost:8080` in your web browser to access the application.

---

## 🔒 Security & Validation Note
- User passwords are securely salted and hashed via `bcryptjs` before storing in the database.
- Database transactions (`connection.beginTransaction()`, `commit()`, `rollback()`) are used during owner registration to ensure integrity across both the `users` and `owners` tables.
- Route access to the `dashboard.html` is protected on the client-side by checking the user's role from session storage.

---

## 📝 License
This project is for educational/portfolio purposes. Feel free to use and extend.

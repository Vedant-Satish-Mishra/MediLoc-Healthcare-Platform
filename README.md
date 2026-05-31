# 💊 MediLoc - Medical Store Management & Medicine Locator System

MediLoc is a full-stack web application designed to connect customers with nearby medical stores and help pharmacy owners efficiently manage their inventory. The platform allows users to search for medicines in real time while enabling store owners to update stock, pricing, discounts, and receive low-stock notifications.

---

## 🚀 Features

### 👨‍⚕️ Customer Features

* Search medicines by name
* Find nearby pharmacies with available stock
* View medicine prices and discounts
* Access pharmacy details including address and contact information
* Responsive and user-friendly interface
* Secure customer registration and login

### 🏪 Pharmacy Owner Features

* Secure owner registration and login
* Add, update, and manage medicines
* Set medicine prices and discount offers
* Track inventory and stock levels
* Receive low-stock alerts
* Manage notifications
* Remove outdated medicine records

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Tailwind CSS
* JavaScript
* AOS (Animate On Scroll)
* Feather Icons

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Security

* bcryptjs (Password Hashing)

---

## 📂 Project Structure

```bash
MEDILOC/
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── customer-login.html
│   ├── owner-login.html
│   ├── customer-registration.html
│   ├── owner-registration.html
│   ├── dashboard.html
│   ├── notifications.html
│   └── assets/
│
├── routes/
│   ├── auth.js
│   └── medicines.js
│
├── database.sql
├── server.js
├── package.json
├── .env
└── README.md
```

---

# 📸 Application Screenshots

> Create a folder named **screenshots** in your repository and upload all screenshots there.

## 🏠 Home Page

![Home Page](screenshots/home%20page.png)

---

## ℹ️ About Us Page

![About Us](screenshots/about%20us.png)

---

## 📞 Contact Us Page

![Contact Us](screenshots/contact%20us.png)

---

## ❓ FAQ & Help Page

![FAQ & Help](screenshots/faq%20and%20help.png)

---

## 🔐 Login Page

![Login Page](screenshots/login.png)

---

## 👤 Customer Login

![Customer Login](screenshots/customer%20login.png)

---

## 🏪 Owner Login

![Owner Login](screenshots/owner%20login.png)

---

## 📝 Customer Registration

![Customer Registration](screenshots/customer%20registration.png)

---

## 📝 Owner Registration

![Owner Registration](screenshots/owner%20registration.png)

---

## 📊 Owner Dashboard

![Owner Dashboard](screenshots/owner%20dashboard.png)

---

## 💊 Register Medicine

![Register Medicine](screenshots/register%20medicine.png)

---

## 🔔 Notification Option

![Notification Option](screenshots/notification%20option.png)

---

# 🏁 Getting Started

## Prerequisites

Make sure the following software is installed:

* Node.js (v16 or above)
* MySQL Server
* Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/MediLoc.git

cd MediLoc
```

---

## 2️⃣ Database Setup

Run the following command:

```bash
mysql -u root -p < database.sql
```

This will create the required database tables:

* Users
* Owners
* Medicines

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8080
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydatabase
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

---

## 4️⃣ Install Dependencies

```bash
npm install
```

---

## 5️⃣ Run the Application

```bash
npm start
```

Server Output:

```bash
🚀 Server running on http://localhost:8080
```

Open your browser and visit:

```text
http://localhost:8080
```

---

# 🔒 Security Features

### Password Hashing

Passwords are securely hashed using **bcryptjs** before being stored in the database.

### Secure Database Transactions

Database transactions ensure data consistency during registration and inventory updates.

### Role-Based Access Control

* Customer Access
* Owner Access
* Protected Dashboard Routes

---

# 📊 Dashboard Highlights

The Owner Dashboard provides:

* Total Medicines Count
* Average Medicine Price
* Low Stock Alerts
* Inventory Overview
* Medicine Management Controls

---

# 🔔 Notification System

MediLoc automatically notifies pharmacy owners when:

* Stock falls below the minimum threshold
* Inventory updates are required
* Medicines are nearly out of stock

This helps maintain inventory efficiency and improves customer satisfaction.

---

# 🎯 Future Enhancements

* 📍 GPS-Based Pharmacy Search
* 🤖 AI-Powered Medicine Recommendations
* 📱 Android & iOS Mobile Application
* 💳 Online Payment Integration
* 🚚 Medicine Delivery Tracking
* ☁️ Cloud Deployment Support

---

# 👨‍💻 Developed By

### Vedant Mishra

* Full Stack Developer
* Engineering Student
* Passionate about Healthcare Technology and Software Development

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Create a Pull Request

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork this repository

📢 Share it with others

---

# 📜 License

This project is developed for educational, academic, and portfolio purposes.

Feel free to use, modify, and extend it.

---

## 💊 MediLoc – Making Medicine Search Faster, Easier, and Smarter.

# 🛒 Ain E-Commerce API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

A robust and scalable backend for an e-commerce platform, built with Node.js, Express, and MongoDB. This API provides all the essential features for a modern online store, including user authentication, product management, shopping cart functionality, and order processing.

---

## 🚀 Key Features

-   **🔐 Secure Authentication**: User registration and login with password hashing using `bcrypt` and stateless session management with `JSON Web Tokens (JWT)`.
-   **📦 Product Management**: Full CRUD (Create, Read, Update, Delete) operations for products, featuring image uploads via `Multer`.
-   **🛒 Shopping Cart**: Persistent user-specific shopping carts, allowing users to add, update, and remove items easily.
-   **💳 Order System**: Integrated order processing to handle customer purchases and order history.
-   **📁 Image Handling**: Supports multiple image uploads for each product (up to 5 per item).
-   **🛡️ Robust Middleware**: Includes comprehensive error handling, authentication guards, and file upload configurations.

---

## 🛠️ Technology Stack

-   **Runtime**: Node.js (v14+)
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Security**: bcrypt, jsonwebtoken
-   **File Management**: Multer
-   **Environment Management**: Dotenv
-   **Cross-Origin**: CORS

---

## 📂 Project Structure

```text
ain/
├── config/             # Database & other configuration
├── controllers/        # Business logic for all routes
├── middleware/         # Auth, Upload, and Error handling
├── models/             # Mongoose schemas (User, Product, Cart, Order)
├── routes/             # API endpoint definitions
├── utils/              # Helper functions & utilities
├── uploads/            # Local storage for product images
├── server.js           # Main application entry point
├── .env                # Environment variables configuration
└── package.json        # Dependencies and scripts
```

---

## 🚦 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |

### 📦 Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/:id` | Retrieve a single product by ID |
| `POST` | `/api/products` | Add a new product (Auth Required) |
| `PUT` | `/api/products/:id` | Update an existing product (Auth Required) |
| `DELETE` | `/api/products/:id` | Delete a product (Auth Required) |

### 🛒 Shopping Cart
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cart` | View current user's cart |
| `POST` | `/api/cart` | Add item to cart |
| `PUT` | `/api/cart/:id` | Update item quantity in cart |
| `DELETE` | `/api/cart/:id` | Remove item from cart |

### 💳 Orders
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Create a new order |
| `GET` | `/api/orders/user` | View user's order history |
| `GET` | `/api/orders/:id` | View specific order details |

---

## ⚙️ Installation

1.  **Clone the repository**:
    ```bash
    git clone [your-repository-url]
    cd ain
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Start the server**:
    ```bash
    # For production
    npm start

    # For development (with nodemon)
    npm run dev
    ```


# **OneFinance – Smart Personal Finance Platform**

OneFinance is a full-stack personal finance application that helps users securely connect their bank accounts, track transactions, and manage finances using the Plaid API. The project includes user authentication, account linking, transaction retrieval, and a clean web dashboard.

---

## 🚀 **Features**

* 🔐 **User Authentication** (Signup & Login)
* 🏦 **Plaid Bank Integration**

  * Connect bank accounts
  * Fetch balances & transactions
  * Secure token exchange
* 👤 **User Account Management**
* ⚙️ **REST API Backend**
* 💻 **React Frontend**
* 🌐 **Environment-based configuration**

---

## 🧱 **Tech Stack**

### **Backend**

* Node.js
* Express.js
* Plaid API
* MongoDB + Mongoose
* dotenv

### **Frontend**

* React (Create React App)

---

## 📂 **Project Structure (Simplified)**

```
Backend/
│── models/
│   └── userModel.js
│── routes/
│   ├── loginRoute.js
│   ├── signupRoute.js
│   ├── AccountRoute.js
│   └── plaidRoutes.js
│── config.js
│── plaid.js
│── plaidController.js
│── index.js
│── .env
```

Frontend lives in:

```
finance-master/
  └── src/
  └── public/
```

---

## ⚙️ **How to Run the Project**

### **1. Backend Setup**

```bash
cd Backend
npm install
npm start
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_url
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox
JWT_SECRET=your_jwt_secret
```

Backend will run on:

```
http://localhost:5000
```

---

### **2. Frontend Setup**

```bash
cd finance-master
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## 🧪 **Available Backend Routes**

### **Auth**

* `POST /signup`
* `POST /login`

### **Plaid**

* `POST /plaid/create-link-token`
* `POST /plaid/exchange-public-token`
* `GET /plaid/transactions`
* `GET /plaid/balance`

### **Account**

* `GET /account/user`
* `GET /account/details`

---

## ✨ **My Contribution (Backend)**

I contributed to the **backend development**, implementing APIs for authentication, Plaid integration, and secure user handling. I also worked on structuring backend routes, integrating Plaid token exchange, and making sure all server-side logic runs smoothly.

---

## 🤝 **Contributors**

* Frontend Team
* Backend Team (You)



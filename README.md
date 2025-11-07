🛒 Mock E-Com Cart App

A simple full-stack shopping cart application built for practice or coding assessments.
It demonstrates integration between a React frontend and a Node.js + Express backend, handling product listings, cart management, and checkout flow.

🚀 Tech Stack

Frontend

React + Vite

Axios (for API calls)

CSS (basic styling)

Backend

Node.js

Express.js

CORS, Nodemon (for dev mode)

Database

⚙️ Features

✅ View product list
✅ Add / Remove items from cart
✅ View total price
✅ Checkout with sample receipt modal
✅ Live API integration between frontend and backend

🧩 Project Structure

mock-ecom/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json

⚡ How to Run

🖥 Backend
Open a terminal:

cd backend
npm install
npm run dev


Server will run at → http://localhost:5000

💻 Frontend

Open another terminal:

cd frontend
npm install
npm run dev


App runs at → http://localhost:5173

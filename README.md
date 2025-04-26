
📈 Paper Trading Simulator

Welcome to my Paper Trading Simulator , a virtual stock trading platform where you can buy and sell stocks with a ₹50,000 virtual balance, track your holdings, monitor real-time prices, and watch your portfolio grow (or crash 🫠) — all without risking a single rupee!

I built this project to practice real-world React + Node.js + MongoDB skills, and to simulate how actual stock trading apps work, but in a much simpler and educational way.



 🚀 Features

- 🛡️ JWT Authentication: Secure signup and login with JSON Web Tokens.
- 💰 Virtual Balance: Start with ₹50,000 and build your dream portfolio.
- 📈 Real Stock Data: Stock prices and market data update twice a day.
- 🛒 Buy/Sell Stocks: Instantly update your holdings with every transaction.
- 📊 Live Holdings View: See your stocks, quantities, average cost, and real-time profit/loss.
- 🔥 Dynamic P&L Calculation: Portfolio profit/loss updates automatically based on latest stock prices.



 🏗️ Project Architecture

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JWT (JSON Web Tokens)
- Password Security: bcrypt hashing
- API Requests: Axios

---

 🛣️ Code & Data Flow

1. Authentication:
   - Users sign up and log in securely.
   - JWT token is issued on login and stored
   - Token is sent with every API call to authenticate the user.

2. Dashboard:
   - After login, users land on the dashboard.
   - Fetches and displays real-time stock data from the backend.
   - Displays user's holdings: stock name, quantity, average price, current price, and profit/loss.

3. Trading (Buy/Sell):
   - Users can buy stocks if they have enough balance.
   - They can sell stocks if they own enough quantity.
   - Every transaction updates:
     - User’s balance
     - User’s holdings
     - User’s profit/loss

4. Stock Updates:
   - Stock data in the database refreshes twice daily to reflect near real-world pricing.

---

 🗃️ MongoDB Collections

- Users:
  - `name`, `email`, `password`, `balance`, `profitLoss`
- Holdings:
  - `userId`, `name` (stock symbol), `qty`, `avg` (average price), `price` (current price)
- Stocks:
  - Stock market data (current price, daily change, P/E ratio, etc.)

---



I've always loved finance and tech, and I wanted to challenge myself with a project that:
- Involves real data (not dummy data).
- Has a real authentication system.
- Requires proper backend/frontend syncing.
- Helps me think like a product builder: user balances, transaction safety, real-time updates, etc.






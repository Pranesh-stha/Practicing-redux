
# 🏦 Redux Practice Repository – React + Redux Toolkit

This repository is created **purely for practicing Redux concepts** in a React application.  
The goal is to understand **how Redux works**, **why we use it**, and **how state flows** in a real app — not to build a production-ready project.

---

## 📌 What This Project Demonstrates

- How **Redux Toolkit** simplifies Redux
- How to create a **slice**
- How **reducers** update state
- How **actions** are dispatched
- How React components **re-render** when Redux state changes
- How global state is shared without props drilling

---

## 🧠 Core Concepts Practiced

- `createSlice`
- `initialState`
- `reducers`
- `dispatch`
- `useSelector`
- `useDispatch`
- Global state management

---

## 📁 Folder Structure

```

src/
│
├── store/
│   ├── customers
│   └── accounts
│
├── App.jsx               # Main React component
├── main.jsx              # Entry point
├── store.js
└── index.css

````

---

## 🧾 The Redux State (initialState)

The global Redux state for this app looks like this:

```js
const initialState = {
  balance: 0,
  loan: 0,
  loanReason: ""
};
````

### Meaning:

* **balance** → Current account balance
* **loan** → Active loan amount
* **loanReason** → Reason for taking the loan

This state is **shared across the entire app**.

---

## 🧩 accountSlice.js Explained

This file is where Redux logic lives.

### Creating a Slice

```js
import { createSlice } from "@reduxjs/toolkit";
```

A **slice** includes:

* Initial state
* Reducer functions
* Automatically generated actions

---

### Reducers (State Updates)

Reducers describe **how state changes**.

#### 1️⃣ Deposit Money

```js
deposit(state, action) {
  state.balance += action.payload;
}
```

* Adds money to balance
* `action.payload` contains the amount

---

#### 2️⃣ Withdraw Money

```js
withdraw(state, action) {
  state.balance -= action.payload;
}
```

* Subtracts money from balance

---

#### 3️⃣ Request a Loan

```js
loanRequest(state, action) {
  state.loan = action.payload.amount;
  state.loanReason = action.payload.reason;
  state.balance += action.payload.amount;
}
```

* Stores loan amount
* Stores loan reason
* Adds loan amount to balance

---

#### 4️⃣ Pay Loan

```js
loanPay(state) {
  state.balance -= state.loan;
  state.loan = 0;
  state.loanReason = "";
}
```

* Deducts loan from balance
* Resets loan info

---

## 🏪 Redux Store (store.js)

```js
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer
  }
});
```

### Why This Is Needed:

* The store holds **all Redux state**
* `configureStore` automatically sets up:

  * Redux DevTools
  * Middleware
  * Best defaults

---

## ⚛️ Using Redux in React Components

### Reading State (`useSelector`)

```js
const balance = useSelector(state => state.account.balance);
```

* Subscribes the component to Redux state
* Component **re-renders automatically** when balance changes

---

### Updating State (`useDispatch`)

```js
const dispatch = useDispatch();

dispatch(deposit(100));
```

* Sends an action to Redux
* Triggers the matching reducer

---

## 🔄 Re-render Behavior (Important!)

* **Redux state changes → Component re-renders**
* Only components that **use that piece of state** re-render
* Parent component may re-render, but React efficiently updates only what changed

---

## 🎯 Purpose of This Repository

This project is meant for:

* Learning Redux fundamentals
* Practicing state updates
* Understanding Redux Toolkit patterns
* Preparing for larger apps

❌ No optimization (memo, selectors, middleware)
❌ No backend
✅ Pure Redux learning

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

---

## 🧪 Suggested Practice Tasks

* Add interest calculation to loan
* Prevent withdraw if balance is insufficient
* Add transaction history array
* Split state into multiple slices
* Add another component that uses the same state

---

## 🧠 Key Takeaway

> Redux is **not about reducing re-renders**,
> it’s about **predictable global state management**.

---

Happy learning Redux! 💙





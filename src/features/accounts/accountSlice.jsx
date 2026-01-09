import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  balance: 0,
  loan: 0,
  loadReason: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    loanRequest(state, action) {

      state.loan = action.payload.amount;
      state.loadReason = action.payload.reason;
      state.balance = state.balance + action.payload.amount;
    },
    loanPay(state,action){
      
      state.balance= state.balance - state.loan
      state.loan= 0
      state.loadReason= ""
    }
  },
});

export default accountSlice.reducer;
export const  { withdraw, loanRequest, loanPay} = accountSlice.actions;

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  return async function (dispatch, getState) {
    const res = await axios.get(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const rate = res.data.rates.USD;
    const finAmount = amount * rate;
    dispatch(deposite(finAmount, "USD"));
  };
}

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/loanRequest":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loadReason: action.payload.reason,
        balance: state.balance + action.payload.amount,
      };
    case "account/loanPay":
      return {
        ...state,
        loan: 0,
        loadReason: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  return async function (dispatch, getState) {
    const res = await axios.get(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const rate = res.data.rates.USD;
    const finAmount = amount * rate;
    dispatch(deposite(finAmount, "USD"));
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function loanRequest(amount, reason) {
  return {
    type: "account/loanRequest",
    payload: { amount: amount, reason: reason },
  };
}
export function loanPay() {
  return { type: "account/loanPay" };
}
*/

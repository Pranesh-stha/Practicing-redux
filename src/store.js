import { createStore } from "redux";

export const initialState = {
  balance: 0,
  loan: 0,
  loadReason: "",
};

export function reducer(state = initialState, action) {
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
        balance: state.balance + action.payload.amount
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

const store = createStore(reducer);

store.dispatch({ type: "account/deposite", payload: 1000 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 100 });
console.log(store.getState());

store.dispatch({
  type: "account/loanRequest",
  payload: { amount: 300, reason: "car wash" },
});
console.log(store.getState());

store.dispatch({ type: "account/loanPay" });
console.log(store.getState());
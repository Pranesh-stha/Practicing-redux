export const initialStateAccount = {
  balance: 0,
  loan: 0,
  loadReason: "",
};

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

export function deposite(amount) {
  return { type: "account/deposite", payload: amount };
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

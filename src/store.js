import { combineReducers, createStore } from "redux";

export const initialStateAccount = {
  balance: 0,
  loan: 0,
  loadReason: "",
};

export const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export function accountReducer(state = initialStateAccount, action) {
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

export function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function loanRequest(amount, reason) {
  return {
    type: "account/loanRequest",
    payload: { amount: amount, reason: reason },
  };
}
function loanPay() {
  return { type: "account/loanPay" };
}

store.dispatch(deposite(2000));
store.dispatch(withdraw(200));

console.log(store.getState());
store.dispatch(loanRequest(1000, "buy a car"));
console.log(store.getState());

store.dispatch(loanPay());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Pranesh Shrestha", "54AB"));
console.log(store.getState());

store.dispatch(updateName("Libisha Gurung"));
console.log(store.getState());

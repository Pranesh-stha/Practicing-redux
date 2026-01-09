import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import Prism from "./Prism";
import { useSelector } from "react-redux";
import logo from "./logo192.png";

function App() {
  const customer = useSelector((store) => store.customer);

  return (
    <>
      <div className="prism-bg-wrapper">
        <Prism
          animationType="rotate"
          timeScale={0.3}
          height={3.5}
          baseWidth={5.5}
          scale={3.2}
          hueShift={0.2}
          colorFrequency={1}
          noise={0.3}
          glow={0.8}
        />
      </div>

      <div className="app-wrapper">
        <div className="app-card">
          <h1>
            <span className="logo-span">
              <img src={logo} alt="logo" />
            </span>{" "}
            <span>React-Redux Bank</span>{" "}
          </h1>

          {customer.fullName ? (
            <>
              <div style={{ position: "relative", marginBottom: "40px" }}>
                <BalanceDisplay />
              </div>
              <div className="account-section">
                <Customer />
              </div>
              <div className="account-section" style={{ marginTop: "32px" }}>
                <AccountOperations />
              </div>
            </>
          ) : (
            <CreateCustomer />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

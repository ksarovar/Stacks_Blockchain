import logo from "./logo.svg";
import "./App.css";

import ConnectWallet from "./components/ConnectWallet";
import ContractCallVote from "./components/ContractCallVote";

function App() {
  return (
    <div className="buttonProperty" >
      <header>
        <div className="buttonProperty" >
        <ConnectWallet />
        <ContractCallVote />
        </div>
      </header>
    </div>
  );
}

export default App;

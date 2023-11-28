import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { AccountsApi, Configuration, StacksCoreApiClients } from '@stacks/blockchain-api-client';

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}
function disconnect() {
  userSession.signUserOut("/");
}
const ConnectWallet = () => {
  const [balance, setBalance] = useState(null);
  const [testnetbalance, setTestnetbalance] = useState(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const address = userSession.loadUserData().profile.stxAddress.mainnet;
      const address1 = userSession.loadUserData().profile.stxAddress.testnet;
      const network = new StacksMainnet();
      const network1 = new StacksTestnet();
      const accountsApi = new AccountsApi(new Configuration({ basePath: network.coreApiUrl }));
      accountsApi.getAccountBalance({ principal: address })
        .then((account) => {
          setBalance(account.stx.balance);
        });
        const accountsApi1 = new AccountsApi(new Configuration({ basePath: network1.coreApiUrl }));
        accountsApi1.getAccountBalance({ principal: address1 })
          .then((account) => {
            setTestnetbalance(account.stx.balance);
          });
    }
  }, [userSession]);

  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <p>Mainnet Address: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>Mainnet Balance: {balance}</p>
        <p>Testnet Address: {userSession.loadUserData().profile.stxAddress.testnet}</p>
        <p>Testnet Balance: {testnetbalance}</p>
      </div>
    );
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;

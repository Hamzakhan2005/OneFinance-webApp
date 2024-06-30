import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import "./Account.css"; // Import the CSS file

axios.defaults.baseURL = "http://localhost:5555";

function PlaidAuth({ publicToken }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {
        public_token: publicToken,
      });
      console.log(accessToken.data);
      const auth = await axios.post("/auth", {
        access_token: accessToken.data.accessToken,
      });
      console.log(auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, [publicToken]);

  return (
    account && (
      <>
        <p>Account Number: {account.account}</p>
        <p>Routing Number: {account.routing}</p>
      </>
    )
  );
}

const Account = () => {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
      console.log(response.data.link_token);
    }
    fetch();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
    },
  });

  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <div className="center-container">
      <button
        className="connect-button"
        onClick={() => open()}
        disabled={!ready}
      >
        Connect a bank account
      </button>
    </div>
  );
};

export default Account;

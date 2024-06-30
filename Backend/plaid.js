import plaid from "plaid";
import dotenv from "dotenv";

dotenv.config();

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments[process.env.PLAID_ENV],
});

export default client;

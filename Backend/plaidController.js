// plaidController.js
import dotenv from "dotenv";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import express from "express";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

router.post("/create_link_token", async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: "unique_user_id",
      },
      client_name: "Your App Name",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.post("/exchange_public_token", async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/transactions", async (req, res) => {
  const accessToken = "your_saved_access_token"; // Replace with your method of storing access tokens
  try {
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: "2023-01-01",
      end_date: "2023-12-31",
    });
    res.json(response.data.transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

export default router;

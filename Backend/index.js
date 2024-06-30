import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import loginRoute from "./routes/loginRoute.js";
import signupRoute from "./routes/signupRoute.js";
import plaidController from "./plaidController.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import AccountRoute from "./routes/AccountRoute.js";

dotenv.config();
const app = express();
// middleware for parsing request body
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
};

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send(`Welcome `);
});

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.use("/oneFinance/login", loginRoute);
app.use("/oneFinance/signup", signupRoute);
app.use("/oneFinance/account", AccountRoute);

app.post("/create_link_token", async function (request, response) {
  // Get the client_user_id by searching for the current user

  const plaidRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user",
    },
    client_name: "Plaid Test App",
    products: ["auth"],
    language: "en",
    redirect_uri: "http://localhost:3000/",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    response.json(createTokenResponse.data);
  } catch (error) {
    response.status(500).send("failure");
  }
});

app.post("/exchange_public_token", async function (request, response, next) {
  const publicToken = request.body.public_token;
  try {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = plaidResponse.data.access_token;

    response.json({ accessToken });
  } catch (error) {
    // handle error
    response.status(500).send("failed");
  }
});

app.post("/auth", async function (req, res) {
  try {
    const access_token = req.body.access_token;
    const plaidRequest = {
      access_token: access_token,
    };

    const plaidResponse = await plaidClient.authGet(plaidRequest);
    res.json(plaidResponse.data);
  } catch (err) {
    res.status(500).send("failed");
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to DB");
    app.listen(PORT, () => {
      console.log(`App is Listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

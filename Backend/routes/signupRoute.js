import express from "express";

import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
const router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route for signup form
router.get("/", (req, res) => {
  res.send("form");
});

// route for signup
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body.username ||
      !req.body.phone_number ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).send({
        message:
          "Send all required info username, phone number, email and password",
      });
    }

    let { username, phone_number, email, password } = req.body;
    const newUser = new User({ username, email, phone_number });

    const user = await User.register(newUser, password);

    return res.status(201).redirect("/");
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;

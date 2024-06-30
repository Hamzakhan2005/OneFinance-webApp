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

router.post("/", (req, res) => {
  res.send("accounts");
});

export default router;

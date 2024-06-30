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

// route for login form
router.get("/", (req, res) => {
  res.send("login form");
});

// route for login
router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req, res) => {
    res.status(201).redirect("/");
  }
);

export default router;

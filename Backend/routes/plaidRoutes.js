import express from "express";
import {
  createLinkToken,
  exchangePublicToken,
  getTransactions,
} from "../controllers/plaidController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create_link_token", authenticate, createLinkToken);
router.post("/exchange_public_token", authenticate, exchangePublicToken);
router.get("/transactions", authenticate, getTransactions);

export default router;

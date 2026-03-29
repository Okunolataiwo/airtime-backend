import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let wallet = 0;

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/test", (req, res) => {
  res.json({ message: "API working fine" });
});
app.post("/fund-wallet", (req, res) => {
  console.log("Request received");
  const { amount } = req.body;
  console.log(amount);
  wallet += amount;
  res.json({ message: "Wallet funded", balance: wallet });
});

app.post("/buy-airtime", (req, res) => {
  const { amount, phone } = req.body;

  if (wallet < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  wallet -= amount;

  res.json({
    message: `Airtime of ₦${amount} sent to ${phone}`,
    balance: wallet
  });
});

app.listen(3000, () => console.log("Server running"));

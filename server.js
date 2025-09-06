import express from "express";
import QRCode from "qrcode";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Your UPI details
const UPI_ID = "prathameshingle2005-1@oksbi";
const PAYEE_NAME = "Prathamesh Ingle";

app.post("/generate-qr", async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=Order-${orderId}`;

    const qrDataUrl = await QRCode.toDataURL(upiString);
    res.json({ qr: qrDataUrl, upiLink: upiString });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR" });
  }
});

app.listen(4000, () => console.log("✅ Server running on port 4000"));

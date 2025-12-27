const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Payment backend is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ Connect to MongoDB Atlas using environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  addresses: [
    {
      id: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      isDefault: Boolean,
    },
  ],
});

const User = mongoose.model("User", UserSchema);


// Signup Route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { name: user.name, email: user.email } });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Protected Route Example
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  });
  
app.put("/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Update user fields
      const { name, email, phone } = req.body;
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
  
      await user.save();
  
      res.json({ name: user.name, email: user.email, phone: user.phone });
    } catch (err) {
      res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  });

app.put("/address", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const newAddress = {
        id: new mongoose.Types.ObjectId().toString(), // Generate a unique ID
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        isDefault: req.body.isDefault || false,
      };
  
      user.addresses.push(newAddress);
      await user.save();
  
      res.json({ addresses: user.addresses });
    } catch (err) {
      console.error("Error adding address:", err);
      res.status(500).json({ message: "Error adding address" });
    }
  });
  

let orders = []; // Store order details
let transactions = []; // Store transaction details


// Handle Credit/Debit Card Payment
app.post("/pay/card", (req, res) => {
    const { cardNumber, cardHolderName, expiryDate, cvv, amount } = req.body;

    // Validate fields
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Mock validation (dummy check)
    if (cardNumber.length !== 16 || cvv.length !== 3) {
        return res.status(400).json({ message: "Invalid card details!" });
    }

    // Simulate payment success
    const transactionId = `TXN${Date.now()}`;
    const orderId = `ORD${Date.now()}`;

    const newOrder = {
        orderId,
        transactionId,
        totalAmount: amount,
        status: "Confirmed",
        date: new Date().toISOString().split("T")[0], // Store only date
    };

    // Save the order
    orders.push(newOrder);
    transactions.push({ type: "card", transactionId, amount, status: "success" });

    res.status(200).json({
        message: "success",
        transactionId,
        orderDetails: newOrder,
    });
});

// Handle UPI Payment
app.post("/pay/upi", (req, res) => {
    const { upiId, amount} = req.body;

    // Validate fields
    if (!upiId || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Mock validation (dummy check for UPI ID format)
    if (!upiId.includes("@")) {
        return res.status(400).json({ message: "Invalid UPI ID!" });
    }

    // Simulate payment success
    const transactionId = `TXN${Date.now()}`;
    const orderId = `ORD${Date.now()}`;

    const newOrder = {
        orderId,
        transactionId,
        totalAmount: amount,
        status: "Confirmed",
        date: new Date().toISOString().split("T")[0],
    };

    // Save the order
    orders.push(newOrder);
    transactions.push({ type: "upi", transactionId, amount, status: "success" });

    res.status(200).json({
        message: "success",
        transactionId,
        orderDetails: newOrder,
    });
});

// API to fetch all orders (for updating the orders page)
app.get("/orders", (req, res) => {
    res.status(200).json({ orders });
});


// Get all transactions
app.get("/transactions", (req, res) => {
    res.status(200).json(transactions);
});

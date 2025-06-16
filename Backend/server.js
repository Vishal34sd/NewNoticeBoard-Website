const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noticeRoutes = require('./routes/noticeRoutes');
const authRoutes = require('./routes/authRoutes');  // ✅ NEW

const app = express();
app.use(cors({origin: 'notice-frontend-two.vercel.app
',credentials: true}));
app.use(express.json());

// Routes
app.use('/api/notices', noticeRoutes);
app.use('/api/auth', authRoutes);  // ✅ Mount here

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));

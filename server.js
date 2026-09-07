require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const compression = require("compression");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const path = require("path");
const { corsOption } = require(path.join(__dirname, 'config', 'corsOptions'));
const { connectDB } = require("./config/dbConnect");
const { apiLimiter, authLimiter, contactLimiter, subscribeLimiter } = require("./middlewares/rateLimiter");

app.use(compression());

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors(corsOption));
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }));

// Sanitize user-supplied data to prevent MongoDB Operator Injection (Express v5 compatible)
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// Apply Rate Limiters
app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/contact", contactLimiter);
app.use("/api/subscribe", subscribeLimiter);

// Routes
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/subscribe", require("./routes/subscribe.routes"));



app.use("/", express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"))
})
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
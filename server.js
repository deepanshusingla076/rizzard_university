const express = require("express");
const fetch = require("node-fetch").default;
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectDB = require("./db/config");

const app = express();
const PORT = 8080;

connectDB();

app.use(
  session({
    secret: "rizzards-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

const errorHandler = require("./middlewares/errorHandler");
const courses = require("./data/courseData");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Authentication middleware
const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/");
};

const apiRoutes = require("./api/apiRoutes");

// Grok Chatbot Proxy Endpoint
app.post("/api/grok-chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Grok API key not set on server." });
  }
  try {
    const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a test assistant." },
          { role: "user", content: message },
        ],
        model: "grok-4-latest",
        stream: false,
        temperature: 0,
      }),
    });
    if (!grokRes.ok) {
      const errorText = await grokRes.text();
      console.error("Grok API error:", errorText);
      return res
        .status(502)
        .json({ error: "Grok API error", details: errorText });
    }
    const data = await grokRes.json();
    res.json(data);
  } catch (err) {
    console.error("Failed to contact Grok API:", err);
    res
      .status(500)
      .json({ error: "Failed to contact Grok API.", details: err.message });
  }
});

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.render("login", { error: undefined, username: "" });
});

app.get("/register", (req, res) => {
  res.render("register", { error: undefined, formData: {} });
});

app.get("/dashboard", (req, res) => {
  const isLoggedIn = req.session && req.session.user;
  res.render("dashboard", {
    currentPage: "home",
    isLoggedIn: isLoggedIn,
  });
});

app.get("/course", checkAuth, (req, res) => {
  res.render("course", { currentPage: "course" });
});

app.get("/course-details/:id", checkAuth, (req, res) => {
  const courseId = req.params.id;
  const course = courses[courseId];
  if (!course) {
    return res.status(404).render("404", { message: "Course not found" });
  }
  res.render("course-details", { course, currentPage: "course" });
});

app.get("/about", (req, res) => {
  const isLoggedIn = req.session && req.session.user;
  res.render("about", {
    currentPage: "about",
    isLoggedIn: isLoggedIn,
  });
});

app.get("/review", checkAuth, (req, res) => {
  res.render("review", { currentPage: "review" });
});

app.get("/contact", (req, res) => {
  const isLoggedIn = req.session && req.session.user;
  const success = req.query.success === "true";
  res.render("contact", {
    currentPage: "contact",
    isLoggedIn: isLoggedIn,
    success: success,
  });
});

app.get("/faq", (req, res) => {
  const isLoggedIn = req.session && req.session.user;
  res.render("faq", {
    currentPage: "faq",
    isLoggedIn: isLoggedIn,
  });
});

app.get("/blog", checkAuth, (req, res) => {
  res.render("blog", { currentPage: "blog" });
});

app.get("/ourteam", (req, res) => {
  const isLoggedIn = req.session && req.session.user;
  res.render("ourteam", {
    currentPage: "ourteam",
    isLoggedIn: isLoggedIn,
  });
});

app.get("/event", checkAuth, (req, res) => {
  res.render("event", { currentPage: "event" });
});

app.get("/form", checkAuth, (req, res) => {
  res.render("form", {
    currentPage: "form",
    success: req.query.success === "true",
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

//CORS
const cors = require("cors")



// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(
    cors({
      origin: [`http://localhost:5173`,`http://127.0.0.1:5173`, `https://booklovers-ironhack.netlify.app`],
        })
      );

// 👇 Start handling routes here

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes"); 
app.use("/auth", authRouter);  

const booksRouter = require("./routes/books.routes"); 
app.use("/books", booksRouter);  

const usersRouter = require("./routes/users.routes"); 
app.use("/users", usersRouter);  

const reviewsRouter = require("./routes/reviews.routes"); 
app.use("/reviews", reviewsRouter);  

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

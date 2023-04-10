const express = require("express");
const router = require("./routes/web.js");
const connectDb = require("./db/connectDb.js")
const MongoStore = require("connect-mongo")
const session = require("express-session")


const app = express()
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// MongoDB Session
const sessionStorage = MongoStore.create({
    mongoUrl: "mongodb+srv://rohanguptabc80:rohan0000@cluster0.kpjqdwd.mongodb.net/test",
    dbName: "Assignment",
    collectionName: "session",
    ttl: 604800000,
    autoRemove: "native"
})

//session
app.use(session({
    name: "sessionkey",
    secret: "iamkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 },
    store: sessionStorage
}))

connectDb();

app.use(router);


//Define Static Css and Js directory.
app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log("Connected Successfully.")
})
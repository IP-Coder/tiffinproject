const { Home, Login, Signup, contact, profile, logout, Tiffin } = require("../controllers/Tiffin-controllers.js");
const express = require("express");


const router = express.Router();


router.get("/", Home);
router.get("/login", Login);
router.post("/login", Login);

router.get("/signup", Signup);
router.post("/signup", Signup);


router.post("/contact", contact);
router.get("/profile", profile);
router.post("/profile", profile);

router.get("/TiffinForm", Tiffin);
router.post("/TiffinForm", Tiffin);

router.get("/logout", logout);

module.exports = router;
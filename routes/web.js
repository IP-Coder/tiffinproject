const { Home, Login, Signup, contact, profile, logout, Tiffin, share, policy, feedback, history } = require("../controllers/Tiffin-controllers.js");
const express = require("express");


const router = express.Router();


router.get("/", Home);
router.get("/login", Login);
router.post("/login", Login);

router.get("/share", share);

router.get("/signup", Signup);
router.post("/signup", Signup);


router.post("/contact", contact);
router.get("/profile", profile);
router.post("/profile", profile);

router.get("/TiffinForm/:size/:cost", Tiffin);
router.post("/TiffinForm/:size/:cost", Tiffin);

router.get("/policy", policy);

router.get("/feedback", feedback);
router.post("/feedback", feedback);

router.get("/history", history);

router.get("/logout", logout);

module.exports = router;
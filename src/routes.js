const { Router } = require("express");
const { verificationToken } = require("./Utils/validateToken.js");
const LoginRoutes = require("./Controllers/LoginController.js");
const RegisterRoutes = require("./Controllers/RegisterController.js");



const router = Router();

router.use("/login", LoginRoutes);
router.use("/register", RegisterRoutes);



router.use("*", (req, res) => {
    res.status(404).send({ error: "page not found" });
});

module.exports = router;
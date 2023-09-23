const { Router } = require("express");
const { verificationToken } = require("./Utils/validateToken.js");
const LoginRoutes = require("./Controllers/LoginController.js");
const RegisterRoutes = require("./Controllers/RegisterController.js");
const servicioRoutes= require ("./Controllers/serviciosController.js")



const router = Router();

router.use("/login", LoginRoutes);
router.use("/register", RegisterRoutes);
router.use("/servicios",verificationToken,servicioRoutes);



router.use("*", (req, res) => {
    res.status(404).send({ error: "page not found" });
});

module.exports = router;
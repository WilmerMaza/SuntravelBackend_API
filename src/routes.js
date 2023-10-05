const { Router } = require("express");
const { verificationToken } = require("./Utils/validateToken.js");
const LoginRoutes = require("./Plataforma/Controllers/LoginController.js");
const RegisterRoutes = require("./Plataforma/Controllers/RegisterController.js");
const servicioRoutes= require ("./Servicios/Controllers/serviciosController.js")
const categoriaRoutes= require ("./Categorias/Controllers/CategoriasController.js")


const router = Router();

router.use("/login", LoginRoutes);
router.use("/register", RegisterRoutes);
router.use("/servicios",verificationToken,servicioRoutes);
router.use("/categoria",verificationToken,categoriaRoutes);



router.use("*", (req, res) => {
    res.status(404).send({ error: "page not found" });
});

module.exports = router;
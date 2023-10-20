const { Router } = require("express");
const { verificationToken } = require("./Utils/validateToken.js");
const LoginRoutes = require("./Plataforma/Controllers/LoginController.js");
const RegisterRoutes = require("./Plataforma/Controllers/RegisterController.js");
const servicioRoutes= require ("./Servicios/Controllers/serviciosController.js");
const categoriaRoutes= require ("./Categorias/Controllers/CategoriasController.js");
const subirImagenRoutes=require("./subirImagen/controllers/subirController.js");
const destinosRoutes= require ("./Destinos/Controllers/DestinosController.js")
const tserviciosRoutes= require ("./Tservicios/Controllers/TserviciosController.js")

const router = Router();

router.use("/login", LoginRoutes);
router.use("/register", RegisterRoutes);
router.use("/servicios",servicioRoutes);
router.use("/categoria",categoriaRoutes);
router.use("/subirImagen",subirImagenRoutes);
router.use("/destinos",destinosRoutes);
router.use("/TipoServicios",tserviciosRoutes);


router.use("*", (req, res) => {
    res.status(404).send({ error: "page not found" });
});

module.exports = router;
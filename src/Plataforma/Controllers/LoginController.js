const { Router } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

const { login_function } = require("../Services/LoginService.js");

const { JWT_STRING, JWT_EXPIRED } = process.env;
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async (req, res) => {
  const { Name, Password } = req.body;

  try {
    const dataBd = await login_function(Name, Password);

    let dataUser;

    const {
      RollSetting: {
        account,
        User: { dataValues },
      },
    } = dataBd.dataValues;

    dataUser = dataValues;
    dataUser["account"] = account;

    jwt.sign(
      { dataUser },
      JWT_STRING,
      { expiresIn: JWT_EXPIRED },
      (error, token) => {
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    const response = {
      isLogin: false,
      msg: "We have detected an error when Login",
      error: error.message, // Puedes acceder al mensaje de error
    };

    res.status(401).send(response);
  }
});

module.exports = router;

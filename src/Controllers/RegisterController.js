const { Router } = require("express");
const { register_function } = require("../Services/RegisterService.js");
const { conn } = require("../db.js");
const { verificationToken } = require("../Utils/validateToken.js");

const router = Router();

router.post("/", async (req, res) => {
  const dataFull = { ...req.body };
  try {
    await register_function(dataFull);
    const response = {
      isRegister: true,
      msg: "was created your activity succesfully"
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error,
    };
    res.status(400).send(response);
  }
});

module.exports = router;

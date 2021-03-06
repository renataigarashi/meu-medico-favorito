const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorController");

//rota que cria medicos
router.post("/", controller.createDoctor);

//rota que retorna os medicos
router.get("/", controller.getAllDoctors);

//rota que retorna por ID
router.get("/:id", controller.getDoctorById);

//rota capaz de alterar todo os medicos
router.put("/:id", controller.updateDoctor);

//rota alterar favorito
router.patch("/:id/favorite", controller.updateFavorite);

//rota deletar
router.delete("/:id", controller.deleteDoctor);

module.exports = router;
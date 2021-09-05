import express from "express";
import {
  createCompany,
  createDirector,
  getCompnay,
  getDirector,
  updateCompany,
  deleteCompany,
} from "../controllers/info.js";

const router = express.Router();

router.get("/getCompany", getCompnay);
router.post("/createCompany", createCompany);
router.post("/updateCompany", updateCompany);
router.post("/deleteCompany", deleteCompany);

router.post("/login", getDirector);
router.post("/createDirector", createDirector);
export default router;

import express from "express";
import {
  createCompany,
  createDirector,
  getCompnay,
  getDirector,
  updateCompany,
  deleteCompany,
} from "../controllers/info.js";
import { verifyJWT } from "../controllers/verifyToken.js";

const router = express.Router();

router.get("/getCompany", verifyJWT, getCompnay);
router.post("/createCompany", verifyJWT, createCompany);
router.post("/updateCompany", verifyJWT, updateCompany);
router.post("/deleteCompany", verifyJWT, deleteCompany);

router.post("/login", getDirector);
router.post("/createDirector", createDirector);
export default router;

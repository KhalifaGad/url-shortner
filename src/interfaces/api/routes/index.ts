import { Router } from "express";
import { URLController } from "../controllers";

const router = Router();

router.post("/encode", URLController.encode);
router.post("/decode", URLController.decode);

export { router };

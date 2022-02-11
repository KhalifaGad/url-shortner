import { Router } from "express";
import { URLController, MappingController } from "../controllers";

const router = Router();

router.post("/encode", URLController.encode);
router.post("/decode", URLController.decode);

router.get("/:hash", MappingController.map);

export { router };

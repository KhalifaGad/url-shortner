import { Router } from "express";
import {
  URLController,
  MappingController,
  StatisticsController,
} from "../controllers";

const router = Router();

router.post("/encode", URLController.encode);
router.post("/decode", URLController.decode);

router.get("/statistic/:hash", StatisticsController.getStatistics);
router.get("/:hash", MappingController.map);

export { router };

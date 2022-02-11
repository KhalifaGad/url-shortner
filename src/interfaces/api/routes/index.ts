import { Router } from "express";
import {
  URLController,
  MappingController,
  StatisticsController,
} from "../controllers";
import { validationware } from "../middlewares";
import * as vaildations from "../validation";

const router = Router();

router.post(
  "/encode",
  validationware("body", vaildations.encodeURLSchema),
  URLController.encode
);
router.post(
  "/decode",
  validationware("body", vaildations.hashSchema),
  URLController.decode
);

router.get(
  "/statistic/:hash",
  validationware("params", vaildations.hashSchema),
  StatisticsController.getStatistics
);
router.get("/:hash", MappingController.map);

export { router };

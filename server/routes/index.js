import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companiesRoutes.js";
import jobRoute from "./jobsRoutes.js";

const router = express.Router();

const path = "/api/";

router.use(`${path}auth`, authRoute); //api/auth/
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, companyRoute);
router.use(`${path}jobs`, jobRoute);

export default router;

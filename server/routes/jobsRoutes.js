import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
  applyJobPost,
  getAppliedJobs,
 cancelApplication
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// IPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

// DELETE JOB POST
router.delete("/delete-job/:id", userAuth, deleteJobPost);

//Apply To Job
router.post("/apply-job/:jobId/:userId", userAuth, applyJobPost);

// Rota para buscar trabalhos aplicados pelo usuário
router.get("/applied-jobs/:userId", userAuth, getAppliedJobs);

// Rota para cancelar inscrição em um trabalho
router.delete("/cancel-application/:jobId/:userId", userAuth, cancelApplication);





export default router;

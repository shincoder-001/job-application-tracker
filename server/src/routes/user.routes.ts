import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
createApplication,
getApplications,
getApplication,
updateApplication,
deleteApplication
} from "../controllers/application.controller";

const router = express.Router();

/*
CREATE APPLICATION
*/
router.post("/applications", authMiddleware, createApplication);

/*
GET ALL APPLICATIONS
*/
router.get("/applications", authMiddleware, getApplications);

/*
GET SINGLE APPLICATION
*/
router.get("/applications/:id", authMiddleware, getApplication);

/*
UPDATE APPLICATION
*/
router.put("/applications/:id", authMiddleware, updateApplication);

/*
DELETE APPLICATION
*/
router.delete("/applications/:id", authMiddleware, deleteApplication);

/*
PROTECTED TEST ROUTE
*/
router.get("/profile", authMiddleware, (req: any, res: any) => {
res.json({
message: "Protected profile data",
user: req.user
});
});

export default router;

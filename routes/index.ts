import express from "express";
import userRoutes from "./user.routes";
import commentRoutes from "./comment.routes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

export default router;

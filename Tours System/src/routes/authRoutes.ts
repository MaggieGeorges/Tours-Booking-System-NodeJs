import { Router } from "express";
import { loginUser, registerUser, getAllUsers, getUserById, updateUser, deleteUser, welcomePage } from "../controllers/authController";
import { verifyToken } from "../middlewares/verifyToken";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const authRouter = Router();

// Public routes
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

// Authenticated routes
authRouter.get("/welcome", verifyToken, welcomePage);

// Admin routes
authRouter.get("/users", verifyToken, adminMiddleware, getAllUsers);
authRouter.get("/users/:id", verifyToken, getUserById); // Admin or user themselves
authRouter.put("/users/:id", verifyToken, updateUser); // Admin or user themselves
authRouter.delete("/users/:id", verifyToken, adminMiddleware, deleteUser);

export default authRouter;

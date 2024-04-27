import express from 'express'
import { registerUser, getAllUsers, loginUser, updateUser, deleteUser, checkUser } from '../modules/users/controller/userControllers';
import { Auth } from '../middlewares/Auth';
import { AdminAuth } from '../middlewares/AdminAuth';

const userRoutes = express.Router();

userRoutes.post("/register", registerUser)
userRoutes.get("/users", AdminAuth, getAllUsers)
userRoutes.post("/login", loginUser)
userRoutes.patch("/update", Auth, updateUser)
userRoutes.delete("/delete", Auth, deleteUser)
userRoutes.post("/check", Auth, checkUser)

export default userRoutes;
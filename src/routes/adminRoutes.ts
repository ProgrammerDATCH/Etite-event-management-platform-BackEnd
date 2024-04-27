import express from 'express'
import { AdminAuth } from '../middlewares/AdminAuth';
import { checkAdmin, getAdminStatistics, loginAdmin } from '../modules/admin/controller/adminControllers';

const adminRoutes = express.Router();

adminRoutes.post("/login", loginAdmin)
adminRoutes.post("/check", AdminAuth, checkAdmin)
adminRoutes.get("/dashboard", AdminAuth, getAdminStatistics)

export default adminRoutes;
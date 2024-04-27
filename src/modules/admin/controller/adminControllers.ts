import { Request, Response } from "express";
import { generateAdminToken } from '../../../utils'
import { countEvents, countTickets, countUsers, findAdmin, findAdminById } from "../repository/adminRepositories";


const checkAdmin = async (req: Request, res: Response) => {
    const admin = await findAdminById((req as any).adminId)
    if (!admin) return res.json({ status: false, message: "Admin not found!" });
    res.json({ status: true, message: admin });
}

const getAdminStatistics = async (req: Request, res: Response) => {
    const stats = {
        events: await countEvents(),
        users: await countUsers(),
        tickets: await countTickets(),
    }
    res.json({ status: true, message: stats });
}

const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const admin = await findAdmin(email, password);
    if (!admin) return res.json({ status: false, message: "Invalid credentials" });
    const token = generateAdminToken(admin.id);
    res.json({ status: true, message: { token, admin } });
}

export {
    loginAdmin,
    checkAdmin,
    getAdminStatistics
}
import express from 'express';
import userRoutes from "./usersRoutes";
import eventRoutes from './eventRoutes';
import adminRoutes from './adminRoutes';
import ticketRoutes from './ticketRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/event', eventRoutes);
router.use('/ticket', ticketRoutes);
router.use('/admin', adminRoutes);

export default router;
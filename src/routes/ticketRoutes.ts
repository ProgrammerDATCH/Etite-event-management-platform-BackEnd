import express from 'express'
import { Auth } from '../middlewares/Auth';
import { AdminAuth } from '../middlewares/AdminAuth';
import { addTicket, getAllUserTickets, deleteTicket, getAllTickets, updateTicketAmount, updateTicketStatus } from '../modules/tickets/controller/ticketControllers';
const ticketRoutes = express.Router();

ticketRoutes.post("/add", Auth, addTicket)
ticketRoutes.get("/tickets/:eventId", AdminAuth, getAllTickets)
ticketRoutes.get("/userTickets", Auth, getAllUserTickets)
ticketRoutes.patch("/update", Auth, updateTicketAmount)
ticketRoutes.patch("/updateStatus", AdminAuth, updateTicketStatus)
ticketRoutes.delete("/delete", Auth, deleteTicket)
ticketRoutes.delete("/deleteTicket", AdminAuth, deleteTicket)

export default ticketRoutes;
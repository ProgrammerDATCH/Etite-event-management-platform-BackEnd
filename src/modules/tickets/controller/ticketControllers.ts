import { Request, Response } from "express";
import { createTicket, deleteTicketById, findTicketById, getTicketsByEventId, updateTicketById, getTicketsByUserId } from "../repository/ticketRepositories";
import sendEmail from "../../../middlewares/sendEmail";
import { findUserById } from "../../users/repository/userRepositories";
import { findEventById, updateEventById } from "../../events/repository/eventRepositories";
const addTicket = async (req: Request, res: Response) => {
    const { eventId, amount } = req.body;
    const userId = (req as any).userId;
    const newTicket = {
        userId,
        eventId,
        amount
    };

    try {
        const newCreatedTicket = await createTicket(newTicket);

        // Reduce event tickets amount
        const oldEvent = await findEventById(eventId);
        if (oldEvent) {
            const newMaxTickets = oldEvent.maxTickets - amount;
            await updateEventById(eventId, { maxTickets: newMaxTickets });
        }

        res.json({ status: true, message: newCreatedTicket });
    } catch (error) {
        console.error("Error adding ticket:", error);
        res.status(500).json({ status: false, message: "An error occurred while adding ticket" });
    }
};

const getAllTickets = async (req: Request, res: Response)=>{
    const { eventId } = req.params;
    const tickets = await getTicketsByEventId(eventId)
    res.json({status: true, message: tickets});
}

const getAllUserTickets = async (req: Request, res: Response)=>{
    const userId = (req as any).userId;
    const tickets = await getTicketsByUserId(userId)
    res.json({status: true, message: tickets});
}

const deleteTicket = async (req: Request, res: Response)=>{
    const {id} = req.body;
    const ticket = await findTicketById(id)
    if(!ticket) return res.json({status: false, message: "Ticket doesn't exist."});
    const { deletedCount } = await deleteTicketById(id);
    if(deletedCount < 1) res.json({status: false, message: "Failed to delete Ticket"});
    else res.json({status: true, message: "Deleted."});
}

const updateTicketAmount = async (req: Request, res: Response)=>{
    const {id, amount} = req.body;
    const ticket = await findTicketById(id);
    if(!ticket) return res.json({status: false, message: "Ticket doesn't exist."});
    const updatedTicket = await updateTicketById(id, {amount});
    if(updatedTicket.modifiedCount > 0) res.json({status: true, message: "Ticket updated successfully"});
    else res.json({status: false, message: "Failed to update Ticket"});
}

const updateTicketStatus = async (req: Request, res: Response)=>{
    const {id, status} = req.body;
    const ticket = await findTicketById(id);
    if(!ticket) return res.json({status: false, message: "Ticket doesn't exist."});
    const updatedTicket = await updateTicketById(id, {status});
    const updatedTicketInfo = await findTicketById(id)
    const user = await findUserById(ticket.userId)
    if(user && updatedTicketInfo){
        const htmlEmail = `<p><h3>Etite Events Management Platform</h3>Hello ${user.name} <br>Your Ticket status changed to: <b>${updatedTicketInfo.status}</b></p>`
        await sendEmail(user.email ,"Etite - Ticket Status Changed.", htmlEmail)
    }
    if(updatedTicket.modifiedCount > 0) res.json({status: true, message: "Ticket updated successfully"});
    else res.json({status: false, message: "Failed to update Ticket"});
}


export {
    addTicket,
    getAllTickets,
    deleteTicket,
    updateTicketAmount,
    updateTicketStatus,
    getAllUserTickets
}
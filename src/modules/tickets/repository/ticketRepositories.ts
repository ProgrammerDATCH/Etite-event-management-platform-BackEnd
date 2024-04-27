import Ticket from "../../../database/models/Ticket";

const createTicket = async (body: Record<string, string>) => {
    return await Ticket.create(body);
}

const getTicketsByEventId = async (eventId: string) => {
    return await Ticket.find({ eventId }).populate('userId').populate('eventId');
}

const getTicketsByUserId = async (userId: string) => {
    return await Ticket.find({userId}).populate('userId').populate('eventId');
}

const findTicketById = async (id: string) => {
    return await Ticket.findOne({_id: id});
}

const deleteTicketById = async (id: string) => {
    return await Ticket.deleteOne({_id: id});
}

const updateTicketById = async (id: string, data: any) => {
    return await Ticket.updateOne({_id: id}, data)
}

export {
    createTicket,
    getTicketsByEventId,
    findTicketById,
    deleteTicketById,
    updateTicketById,
    getTicketsByUserId
}
import Admin from "../../../database/models/Admin";
import Event from "../../../database/models/Event";
import Ticket from "../../../database/models/Ticket";
import User from "../../../database/models/User";


const findAdmin = async (email: string, password: string) => {
    return await Admin.findOne({email, password});
}

const findAdminById = async (id: string) => {
    return await Admin.findOne({_id: id});
}

const countUsers = async () => {
    return await User.countDocuments();
}

const countEvents = async () => {
    return await Event.countDocuments();
}

const countTickets = async () => {
    return await Ticket.countDocuments();
}

export {
    findAdmin,
    findAdminById,
    countEvents,
    countTickets,
    countUsers,
}
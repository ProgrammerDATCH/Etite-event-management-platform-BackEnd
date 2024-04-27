import mongoose from "mongoose";
import { ticketStatus } from "../../types";

const ticketSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        ref: 'Event'
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        required: true,
        default: ticketStatus.PENDING
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
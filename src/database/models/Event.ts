import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    maxTickets: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
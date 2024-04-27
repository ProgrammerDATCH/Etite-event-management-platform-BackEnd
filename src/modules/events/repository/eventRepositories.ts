import Event from "../../../database/models/Event";

const createEvent = async (body: Record<string, any>) => {
    return await Event.create(body);
}

const getEvents = async () => {
    return await Event.find()
}

const findEventById = async (id: string) => {
    return await Event.findOne({_id: id});
}

const deleteEventById = async (id: string) => {
    return await Event.deleteOne({_id: id});
}

const updateEventById = async (id: string, data: any) => {
    return await Event.updateOne({_id: id}, data)
}

export {
    createEvent,
    getEvents,
    findEventById,
    deleteEventById,
    updateEventById,
}
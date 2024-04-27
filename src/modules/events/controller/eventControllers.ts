import { Request, Response } from "express";
import { createEvent, deleteEventById, findEventById, getEvents, updateEventById } from "../repository/eventRepositories";
import uploadImage from "../../../middlewares/uploadImage";

const addEvent = async (req: Request, res: Response)=>{
    const {title, date, location, image, maxTickets} = req.body;
    let imageLink;
    try{
        imageLink = await uploadImage(image)
    }
    catch(err){
        return res.json({status: false, message: "Choose another image"});
    }
    const newEvent = {
        title,
        date,
        location,
        image: imageLink,
        maxTickets
    };
    const newCreatedEvent = await createEvent(newEvent);
    res.json({status: true, message: newCreatedEvent});
}

const getAllEvents = async (req: Request, res: Response)=>{
    const events = await getEvents()
    res.json({status: true, message: events});
}

const getEventById = async (req: Request, res: Response)=>{
    const id = req.params.eventId;
    const event = await findEventById(id)
    res.json({status: true, message: event});
}

const deleteEvent = async (req: Request, res: Response)=>{
    const {id} = req.body;
    const event = await findEventById(id)
    if(!event) return res.json({status: false, message: "Event doesn't exist."});
    const { deletedCount } = await deleteEventById(id);
    if(deletedCount < 1) res.json({status: false, message: "Failed to delete Event"});
    else res.json({status: true, message: "Deleted."});
}

const updateEvent = async (req: Request, res: Response)=>{
    const {id, title, date, location, maxTickets} = req.body;
    const event = await findEventById(id);
    if(!event) return res.json({status: false, message: "Event doesn't exist."});
    const updatedEvent = await updateEventById(id, {title, date, location, maxTickets});
    if(updatedEvent.modifiedCount > 0) res.json({status: true, message: "Event updated successfully"});
    else res.json({status: false, message: "Failed to update Event"});
}


export {
    addEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    getEventById
}
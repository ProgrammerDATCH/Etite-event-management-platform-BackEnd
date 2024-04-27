import express from 'express'
import { AdminAuth } from '../middlewares/AdminAuth';
import { addEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../modules/events/controller/eventControllers';
const eventRoutes = express.Router();

eventRoutes.post("/add", AdminAuth, addEvent)
eventRoutes.get("/events", getAllEvents)
eventRoutes.get("/event/:eventId", getEventById)
eventRoutes.patch("/update", AdminAuth, updateEvent)
eventRoutes.delete("/delete", AdminAuth, deleteEvent)

export default eventRoutes;
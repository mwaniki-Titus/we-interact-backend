import { Router } from 'express';
import { createEventController, deleteEventController, getAllEventsController, getSingleEventController, getEventsByAttendeeID } from '../controllers/eventsController.js';

const eventRouter = Router();

eventRouter.post('/events', createEventController);

eventRouter.get('/events', getAllEventsController);

eventRouter.get('/events/single/:EventID', getSingleEventController);

// eventRouter.put('/events/update/:EventID', updateEventController);

eventRouter.delete('/events/delete/:EventID', deleteEventController);
eventRouter.get('/users/:UserID/events', getEventsByAttendeeID);

export default eventRouter;


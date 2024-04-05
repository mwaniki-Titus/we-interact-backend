import { Router } from 'express';
import { createEventAttendeeController, getAllEventAttendeesController, deleteEventAttendeeController, getAllEventAttendeesForEventController , getEventAttendeesController,  getEventsRegisteredByUserController} from '../controllers/eventAtendeecontroller.js';

const eventAttendeeRouter = Router();

eventAttendeeRouter.post('/eventattendee', createEventAttendeeController);
eventAttendeeRouter.get('/eventattendee/:EventID', getAllEventAttendeesController);
eventAttendeeRouter.delete('/eventattendee/delete/:EventID/:AttendeeID', deleteEventAttendeeController);
eventAttendeeRouter.get('/eventattendee/AttendeeID/', getAllEventAttendeesForEventController);
eventAttendeeRouter.get('/eventattendee/:AttendeeID/', getEventAttendeesController);
eventAttendeeRouter.get('/eventAttendees/user/:AttendeeID', getEventsRegisteredByUserController);

export default eventAttendeeRouter;


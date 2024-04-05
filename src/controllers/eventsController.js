import { v4 } from 'uuid';
import { sendCreated, sendServerError, sendNotFound, sendBadRequest } from "../helpers/helperFunctions.js";
import { createEventService, deleteEventService, getEventByIdService, getEventService, getEventsByAttendeeIDService } from '../services/eventService.js';
import { eventValidator } from '../validators/eventValidator.js';

export const createEventController = async (req, res) => {
    try {
        const { EventName, Description, EventDate, Location, EventPosterURL } = req.body;
        const eventID = v4();
        const newEvent = {
            EventID: eventID,
            EventName,
            Description,
            EventDate, 
            Location,
            EventPosterURL
        };

        // const { error } = eventValidator(newEvent);
        // if (error) {
        //     return sendBadRequest(res, 'Validation error in the data input', error);
        // }

        const result = await createEventService(newEvent);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            sendCreated(res, 'Event created successfully');
        }
    } catch (error) {
        sendServerError(res, 'Server error');
    }
};

// export const updateEventController = async (req, res) => {
//     try {
//         const { EventName, Description, EventDate, Location, EventPosterURL } = req.body;
//         const { EventID } = req.params;

//         const updatedEvent = await updateEventService({ EventID, EventName, Description, EventDate, Location, EventPosterURL });

//         if (updatedEvent.error) {
//             return sendServerError(res, updatedEvent.error);
//         }

//         return sendCreated(res, 'Event updated successfully');
//     } catch (error) {
//         return sendServerError(res, 'Internal server error');
//     }
// };

export const getSingleEventController = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await getEventByIdService(eventId);
        if (!event) {
            return sendNotFound(res, 'Event not found');
        } else {
            res.status(200).json(event);
        }
    } catch (error) {
        sendServerError(res, 'Server error');
    }
};

export const getAllEventsController = async (req, res) => {
    try {
        const events = await getEventService();
        if (events.length === 0) {
            return sendNotFound(res, 'Events not found');
        } else {
            res.status(200).json(events);
        }
    } catch (error) {
        sendServerError(res, 'Server error');
    }
};

export const deleteEventController = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await getEventByIdService(eventId);
        if (!event) {
            return sendNotFound(res, 'Event not found');
        } else {
            await deleteEventService(eventId);
            return res.status(204).send();
        }
    } catch (error) {
        sendServerError(res, 'Server error');
    }
};


// export const getEventsByAttendeeID = async (req, res) => {
//     const UserID= req.params.UserID; 
//     try {
//         const events = await getEventsByAttendeeIDService (UserID);
//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
export const getEventsByAttendeeID = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const events = await getEventsByAttendeeIDService(userId);
        res.status(200).json(events);
    } catch (error) {
        console.error("Error getting events by attendee ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
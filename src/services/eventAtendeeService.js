import { poolRequest, sql } from '../utils/dbConnect.js';

// Create event attendee service
export const createEventAttendeeService = async (eventAttendee) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, eventAttendee.EventID)
            .input('AttendeeID', sql.VarChar, eventAttendee.AttendeeID)
            .query('INSERT INTO EventAttendee (EventID, AttendeeID) VALUES (@EventID, @AttendeeID)');
        console.log('results', result);
        return result;
    } catch (error) {
        return error;
    }
};

// Fetch single event attendee
export const getSingleEventAttendeeService = async (EventID, AttendeeID) => {
    try {
        const singleEventAttendee = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .input('AttendeeID', sql.VarChar, AttendeeID)
            .query('SELECT * FROM EventAttendee WHERE EventID = @EventID AND AttendeeID = @AttendeeID');
        console.log('single event attendee', singleEventAttendee.recordset);
        return singleEventAttendee.recordset;
    } catch (error) {
        return error;
    }
};

// Check existing event attendee
export const checkExistingEventAttendee = async (EventID, AttendeeID) => {
    try {
        const existingEventAttendee = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .input('AttendeeID', sql.VarChar, AttendeeID)
            .query('SELECT * FROM EventAttendee WHERE EventID = @EventID AND AttendeeID = @AttendeeID');
        return existingEventAttendee;
    } catch (error) {
        return error;
    }
};

// Fetch all event attendees
export const getAllEventAttendeesService = async (EventID) => {
    try {
        const allEventAttendees = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .query(`SELECT EventAttendee.*, tbl_user.*
                     FROM EventAttendee
                     JOIN tbl_user ON EventAttendee.AttendeeID = tbl_user.UserID
                     WHERE EventAttendee.EventID = @EventID`);
        return allEventAttendees;
    } catch (error) {
        return error;
    }
};

// Delete event attendee
export const deleteEventAttendeeService = async (EventID, AttendeeID) => {
    try {
        const deletedEventAttendee = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .input('AttendeeID', sql.VarChar, AttendeeID)
            .query('DELETE FROM EventAttendee WHERE EventID = @EventID AND AttendeeID = @AttendeeID');
        console.log('deleted event attendee', deletedEventAttendee.recordset);
        return deletedEventAttendee.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch all event attendees for a specific event
export const getAllEventAttendeesForEventService = async (EventID) => {
    try {
        const allEventAttendeesForEvent = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .query(`SELECT EventAttendee.*, tbl_user.*
                     FROM EventAttendee
                     JOIN tbl_user ON EventAttendee.AttendeeID = tbl_user.UserID
                     WHERE EventAttendee.EventID = @EventID`);
        return allEventAttendeesForEvent;
    } catch (error) {
        return error;
    }
};

export const getEventAttendeesService = async (AttendeeID) => {
    try {
        const allEventAttendees = await poolRequest()
            .input('AttendeeID', sql.VarChar, AttendeeID)
            .query(`SELECT EventAttendee.*, tbl_user.*
                     FROM EventAttendee
                     JOIN tbl_user ON EventAttendee.AttendeeID = tbl_user.UserID
                     WHERE EventAttendee.ID = @AttendeeID`);
        return allEventAttendees;
    } catch (error) {
        return error;
    }
};

export const getEventsRegisteredByUser = async (AttendeeID) => {
    try {
        const eventsRegisteredByUser = await poolRequest()
            .input('AttendeeID', sql.VarChar, AttendeeID)
            .query(`SELECT Event.*, EventAttendee.*
                     FROM Event
                     INNER JOIN EventAttendee ON Event.EventID = EventAttendee.EventID
                     WHERE EventAttendee.AttendeeID = @AttendeeID`);
        return eventsRegisteredByUser;
    } catch (error) {
        return error;
    }
};
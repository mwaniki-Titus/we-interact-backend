import { poolRequest, sql } from "../utils/dbConnect.js";

export const createEventService = async (event) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, event.EventID)
            .input('EventName', sql.VarChar, event.EventName)
            .input('Description', sql.VarChar, event.Description)
            .input('EventDate', sql.DateTime, event.EventDate)
            .input('Location', sql.VarChar, event.Location)
            .input('EventPosterURL', sql.VarChar, event.EventPosterURL)
            .query('INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL) VALUES (@EventID, @EventName, @Description, @EventDate, @Location, @EventPosterURL)');
            console.log("result",result);
        return result;
    } catch (error) {
        throw error;
    }
};

// export const updateEventService = async (updateEvent) => {
//     try {
//         const result = await poolRequest()
//             .input('EventID', sql.VarChar, updateEvent.EventID)
//             .input('EventName', sql.VarChar, updateEvent.EventName)
//             .input('Description', sql.VarChar, updateEvent.Description)
//             .input('EventDate', sql.DateTime, updateEvent.EventDate)
//             .input('Location', sql.VarChar, updateEvent.Location)
//             .input('EventPosterURL', sql.VarChar, updateEvent.EventPosterURL)
//             .query(`UPDATE Event SET EventName = @EventName, Description = @Description, EventDate = @EventDate, Location = @Location, EventPosterURL = @EventPosterURL WHERE EventID = @EventID`);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

export const getEventByIdService = async (eventId) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, eventId)
            .query('SELECT * FROM Event WHERE EventID = @EventID');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

export const getEventService = async () => {
    try {
        const result = await poolRequest().query('SELECT * FROM Event');
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export const deleteEventService = async (eventId) => {
    try {
        await poolRequest()
            .input('EventID', sql.VarChar, eventId)
            .query('DELETE FROM Event WHERE EventID = @EventID');
    } catch (error) {
        throw error;
    }
};

// export const getEventsByAttendeeIDService = async (userId) => {
//     try {
//         const result = await poolRequest()
//             .input('UserID', sql.VarChar, userId)
//             .query('SELECT * FROM Event WHERE AttendeeID = @UserID'); 
//         return result.recordset;
//     } catch (error) {
//         throw error;
//     }
// };

export const getEventsByAttendeeIDService = async (userId) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, userId)
            .query('SELECT Event.* FROM Event INNER JOIN Attendees ON Event.EventID = Attendees.EventID WHERE Attendees.UserID = @UserID'); 
        return result.recordset;
    } catch (error) {
        throw error;
    }
};



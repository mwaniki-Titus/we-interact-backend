import joi from 'joi';

export const eventAttendeeValidator = (eventAttendee) => {
    const eventAttendeeSchema = joi.object({
        EventID: joi.string().required(),
        AttendeeID: joi.string().required()
    });

    return eventAttendeeSchema.validate(eventAttendee);
};

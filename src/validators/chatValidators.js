
import joi from 'joi';

export  const createChatValidator=(chat)=>{
    const createChatValidatorSchema=joi.object({
        SenderID: joi.string().required(),
        ReceiverID: joi.string().required()
    })

    return createChatValidatorSchema.validate(chat);
}


import {Router} from 'express';
import { createNewStatusController, deleteUserController, getAllStatusController, getSingleStatusController, updateStatusControllers } from '../controllers/statusControlers.js';

const statuRouter=Router();

statuRouter.post('/status/' , createNewStatusController )
statuRouter.get('/status' , getAllStatusController )

statuRouter.get('/status/single/:StatusID' , getSingleStatusController)

statuRouter.put('/status/update/:StatusID' , updateStatusControllers)


statuRouter.delete('/status/delete/:StatusID', deleteUserController)


export default statuRouter;
import { Router } from 'express';
import { getPhotos, createPhoto, deletePhoto, getPhotosByUserID , getAllPhotos} from '../controllers/photoController.js';
import logger from '../utils/Logger.js';
import { getAllPhotosService } from '../services/photosServices.js';

const photoRouter = Router();

photoRouter.get('/photos/:UserID', getPhotos);
// photoRouter.get('/photos/:id', getPhotoById);
photoRouter.post('/photos', createPhoto);
photoRouter.delete('/photos/:id', deletePhoto);
photoRouter.get("/yours/:UserID", getPhotosByUserID);
photoRouter.get('/photos', getAllPhotos);

export default photoRouter;
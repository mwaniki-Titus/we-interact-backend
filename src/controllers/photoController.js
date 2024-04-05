import { sendBadRequest, sendNotFound, sendCreated, sendServerError } from "../helpers/helperFunctions.js";
import { getPhotoService, createPhotoService, deletePhotoService, updatePhotoService, getPhotosByUserIDService, getAllPhotosService } from '../services/photosServices.js';
import { photoValidator } from '../validators/photoValidator.js';
import {v4} from 'uuid'

export const getPhotos = async (req, res) => {
    try {
        const {UserID}=req.params
        const data = await getPhotoService(UserID);
        console.log("data",data);
        
        if (data.recordset) {
            return res.status(200).json(data.recordset);
           
        } else {
            return sendNotFound(res, 'Photos not found');
        }
    } catch (error) {
     
        sendServerError(res, 'Server error');
    }
}


export const createPhoto = async (req, res) => {
    try {
        const { UserID, PhotoURL } = req.body;

    
        if (!UserID || !PhotoURL) {
            return sendBadRequest(res, 'UserID and PhotoURL are required.');
        }

    
        const PhotoID = v4();

        const UploadDate = new Date();
        const newPhoto = {
            PhotoID,
            UserID, 
            PhotoURL,
            UploadDate
        };

        const response = await createPhotoService(newPhoto);

        if (response) {
            return sendCreated(res, 'Photo created successfully');
        } else {
            return sendServerError(res, 'Failed to create photo. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};



export const deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const photo = await getPhotoByIdService(photoId);
        if (!photo) {
            return sendNotFound(res, 'Photo not found');
        } else {
            await deletePhotoService(photoId);
            return res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const updatePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const {UserID, PhotoURL, UploadDate } = req.body;
        const PhotoID=v4()
        const updatedPhoto = {
        
            UserID,
            PhotoURL,
            UploadDate
        };

        const { error } = photoValidator(updatedPhoto);
        if (error) {
            return sendBadRequest(res, 'Validation error in the data input', error);
        }

        const response = await updatePhotoService(photoId, updatedPhoto);
        if (response instanceof Error) {
            return sendServerError(res, 'Failed to update photo. Please try again later.');
        } else {
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const getPhotosByUserID = async (req, res) => {
    try {
      const { UserID } = req.params;
      const photos = await getPhotosByUserIDService(UserID);
   
      if (photos) {
        return res.status(200).json(photos);
      } else {
        return res.status(404).json({ error: "Photos not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

  export const getAllPhotos = async (req, res) => {
    try {
      const photos = await getAllPhotosService();
      res.json(photos);
    } catch (error) {
      console.error('Error fetching all photos:', error);
      res.status(500).json({ error: 'Failed to fetch all photos' });
    }
  };
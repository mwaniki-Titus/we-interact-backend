import { v4 } from 'uuid';

//Category Service
import {createCategoryService, getAllCategoriesService, deleteCategoryService} from '../services/videoCategoryService.js'

//Validator
import { videoCategoryValidator } from '../validators/videoCategoryValidator.js';

//Helper functions
import {sendCreated, sendNotFound, sendDeleteSuccess, sendServerError} from '../helpers/helperFunctions.js';

//Creating a new categories
export const addCategory = async (req, res) => {
    const { categoryName, previewURL, createDate} = req.body;
    const {error} = videoCategoryValidator({ categoryName, previewURL, createDate });
    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            const categoryID = v4();
            const createDate = new Date();
            const newCategory = {categoryID, categoryName, previewURL, createDate}
            const response = await createCategoryService(newCategory);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Video category was created successfully")
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const data = await getAllCategoriesService()
        if (!data.recordset) {
            return sendNotFound(res, "No category found")
        }
        return res.status(200).json(data.recordset);
    } catch (error) {
        sendServerError(res, error);
    }
}

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const {categoryID} = req.params;
        const response = await deleteCategoryService(categoryID);
        if (response.rowsAffected == 1) {
            sendDeleteSuccess(res, "Category deleted successfully")
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

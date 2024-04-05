import { v4 } from "uuid";

// service
//validator
// helper
import { sendCreated, sendNotFound, sendDeleteSuccess, sendServerError } from "../helpers/helperFunctions";

//Create a category video
export const addVideoCategoryController = async (req, res) => {
        try {
            const { categoryID, categoryVideoURL } = req.body;
            const categoryVideosID = v4();
            console.error("error", error);
            if (error) {
                return res.status(400).send(error.details[0].message);
            } else {                
            const newVideoCategory = {categoryVideosID, categoryID, categoryVideoURL}

            const response = await createCategoryService(newCategory);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Video category was created successfully")
            }
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
};
import { sendServerError } from "../helpers/helperFunctions.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createCategoryService = async (newCategory) => {
    try {
        const addCategoryQuery = `INSERT INTO videoCategory (categoryID, categoryName, previewURL, createDate)
        VALUES (@categoryID, @categoryName, @previewURL, @createDate)`;
        const result = await poolRequest()
        .input("categoryID", sql.VarChar, newCategory.categoryID)
        .input("categoryName", sql.VarChar, newCategory.categoryName)
        .input("previewURL", sql.VarChar, newCategory.previewURL)
        .input("createDate", sql.DateTime, newCategory.createDate)
        .query(addCategoryQuery)
        return result;
    } catch(error) {
        return error;
    }
};

export const getAllCategoriesService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM videoCategory`)
        return result;
    } catch (error) {
        return error;
    }
};

export const deleteCategoryService = async (categoryID) => {
    try {
        const response = await poolRequest()
        .input("categoryID", sql.VarChar(255), categoryID)
        .query('DELETE FROM videoCategory WHERE categoryId = @categoryID');
        return response;
    } catch(error) {
        return error;
    }
};


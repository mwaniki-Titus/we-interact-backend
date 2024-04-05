import { v4 } from "uuid";
import {
  notAuthorized,
  orderData,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createGroupValidator,
  updateGroupNameValidator,
  updateGroupValidator,
} from "../validators/groupValidators.js";
import {
  createGroupService,
  deleteGroupServices,
  getAllGroupsService,
  getSingleGroupServices,
  updateGroupNameService,
  updateGroupService,
} from "../services/groupService.js";

export const createGroupController = async (req, res) => {
  try {
    const { GroupName, Description, group_image, CreatedByID } = req.body;
    console.log(req.body);

    const GroupID = v4();
    const { error } = createGroupValidator({
      GroupName,
      Description,
      group_image,
    });
    console.log("error", error);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const CreatedDate = new Date();
      const createdGroup = {
        GroupID,
        GroupName,
        CreatedByID,
        Description,
        group_image,
        CreatedDate,
      };

      const result = await createGroupService(createdGroup);

      if (result.message) {
        sendServerError(res, result.message);
      } else {
        sendCreated(res, "Group created successfully");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateGroupControllers = async (req, res) => {
  try {
    const { GroupName, Description, group_image } = req.body;
    const { GroupID } = req.params;

    const CreatedDate = new Date();
    const { error } = updateGroupValidator({
      GroupName,
      Description,
      group_image,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedGroup = await updateGroupNameService({
      GroupID,
      GroupName,
      Description,
      CreatedDate,
      group_image,
    });
    console.log("Updated one", updatedGroup);
    if (updatedGroup.error) {
      return sendServerError(res, updatedGroup.error);
    }

    return sendCreated(res, "Group updated successfully");
  } catch (error) {
    return sendServerError(res, "Internal server error");
  }
};

export const updateGroupNameControllers = async (req, res) => {
  try {
    const { GroupName } = req.body;
    const { GroupID } = req.params;

    const { error } = updateGroupNameValidator({ GroupName });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedGroupName = await updateGroupService({ GroupName, GroupID });
    console.log("Updated one", updatedGroupName);

    if (updatedGroupName.error) {
      return sendServerError(res, updatedGroupName.error);
    }

    return sendCreated(res, "GroupName updated successfully");
  } catch (error) {
    return sendServerError(res, "Internal server error");
  }
};

export const getSingleGroupController = async (req, res) => {
  try {
    const { GroupID } = req.params;
    const singleGroup = await getSingleGroupServices(GroupID);

    console.log("single", singleGroup);
    res.status(200).json(singleGroup);
  } catch (error) {
    return error;
  }
};

//   try {
//     const data = await getTodosService();
//     if (data.length === 0) {
//         sendNotFound(res, 'No todos found');
//     } else {
//         if (!req.query.page && !req.query.limit) {
//             if (req.query.order) {
//                 res.status(200).json(orderData(data, req.query.order));
//             } else {
//                 res.status(200).json(data);
//             }
//         } else {
//             if (req.query.order) {
//                 paginate(orderData(data, req.query.order), req, res);
//             } else {
//                 paginate(data, req, res);
//             }
//         }
//     }
// }

export const getAllGroupsController = async (req, res) => {
  try {
    const results = await getAllGroupsService();
    const groups = results.recordset;
    console.log(groups);
    if (groups.length == 0) {
      sendNotFound(res, "No groups found");
    } else {
      if (req.query.order) {
        res.status(200).json(orderData(groups, req.query.order));
      } else {
        res.status(200).json(groups);
      }
    }
  } catch (error) {
    console.error("Error fetching all group:", error);
    res.status(500).json("Internal server error");
  }
};

export const deleteGroupControllers = async (req, res) => {
  try {
    const { GroupID } = req.params;
    const deletedGroup = await deleteGroupServices(GroupID);
    console.log("deleted group", deletedGroup);
    sendDeleteSuccess(res, "Deleted successfully");
  } catch (error) {
    return error;
  }
};

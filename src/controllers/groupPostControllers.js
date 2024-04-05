import {v4} from 'uuid'
import { notAuthorized, orderData, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createGroupActivityService, getAllGroupsActivityService, getGroupActivityServices } from '../services/groupPostService.js';
import { createGroupActivityValidator } from '../validators/groupActivityValidators.js';

export const createGroupActivityController = async (req, res) => {
    try {
      // GroupActivityID
// GroupID 
// description 
// activity_photo
// UploadedByID 
// CreatedDate
      const { GroupID,description,activity_photo,UploadedByID } = req.body;
      console.log(req.body);
      createGroupActivityValidator
      const GroupActivityID = v4();
      const { error } = createGroupActivityValidator({ GroupID,description,activity_photo,UploadedByID });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const CreatedDate = new Date();    
        const createdGroup = { GroupActivityID,GroupID,description,activity_photo,UploadedByID,CreatedDate};
  
        const result = await createGroupActivityService(createdGroup);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Group created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


//   export const updateGroupPostControllers = async (req, res) => {
//     try {
//       const { GroupName,Description ,group_image} = req.body;
//       const { GroupID } = req.params;

//       const CreatedDate = new Date();    
//       const { error } = updateGroupPostValidator({ GroupName,Description ,group_image});
//       if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//       }
  
//       const updatedGroup = await updateGroupNameService({ GroupID,GroupName,Description,CreatedDate,group_image });
//       console.log('Updated one',updatedGroup);
//       if (updatedGroup.error) {
//         return sendServerError(res, updatedGroup.error);
//       }
  
//       return sendCreated(res, 'Group updated successfully');
//     } catch (error) {
//       return sendServerError(res, 'Internal server error');
//     }
//   };
  

//   export const updateGroupNameControllers = async (req, res) => {
//     try {
//       const { GroupName } = req.body;
//       const { GroupID } = req.params;

//       const { error } = updateGroupNameValidator({ GroupName });
//       if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//       }
  
//       const updatedGroupName = await updateGroupService({ GroupName , GroupID });
//       console.log('Updated one',updatedGroupName);
  
//       if (updatedGroupName.error) {
//         return sendServerError(res, updatedGroupName.error);
//       }
  
//       return sendCreated(res, 'GroupName updated successfully');
//     } catch (error) {
//       return sendServerError(res, 'Internal server error');
//     }
//   };
  

  export const getGroupActivityController=async(req,res)=>{
    try {
      const {GroupID}=req.params
      const singleGroupActivity=await getGroupActivityServices(GroupID)
      const result=singleGroupActivity.recordset
      console.log('ActivityGroup',result); 
      res.status(200).json(result);

    } catch (error) {
      return error
    }
  }



  export const getAllGroupPostController = async (req, res) => {
    try {
      const results = await getAllGroupsActivityService()
        const groupsActivity=results.recordset
        console.log(groupsActivity);

        if (groupsActivity.length == 0) {
          sendNotFound(res, "No activity  found");
        } else {
          if (req.query.order) {
            res.status(200).json(orderData(groupsActivity, req.query.order));
          } else {
            res.status(200).json(groupsActivity);
          }
        }

    } catch (error) {
      console.error("Error fetching all group activity", error);
      res.status(500).json("Internal server error");
    }
  };


//   export const deleteGroupControllers=async(req,res)=>{
//     try {
//       const {GroupID}=req.params
//       const deletedGroup=await deleteGroupServices(GroupID)
//       console.log('deleted group',deletedGroup); 
//       sendDeleteSuccess(res,"Deleted successfully")
//     } catch (error) {
//       return error
//     }
//   }

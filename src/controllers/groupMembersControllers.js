import {v4} from 'uuid'
import { notAuthorized, sendClientError, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import {checkingExistingGroupMember, createGroupMemberService, deleteGroupMemberServices, getAllGroupMembersService, getSingleGroupMemberServices,} from '../services/groupMembersServices.js'
import { createGroupMembersValidator } from '../validators/groupMembersValidators.js'

export const createGroupMembersController = async (req, res) => {
  try {
    const { GroupID, MemberID } = req.body;

    const existingUser = await checkingExistingGroupMember({ GroupID, MemberID });
    console.log("existing", existingUser.rowsAffected);

    const { error } = createGroupMembersValidator({ GroupID, MemberID });
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const createdGroupMembers = { GroupID, MemberID };

      if (existingUser.rowsAffected > 0) {
        sendClientError(res, 'You are already a member of this group');
      } else {
        try {
          const result = await createGroupMemberService(createdGroupMembers);
          if (result.message) {
            sendServerError(res, result.message);
          } else {
            sendCreated(res, 'You have joined Group successfully');
          }
        } catch (error) {
          console.log(error.message);
          if (error.message.includes("Violation of PRIMARY KEY constraint")) {
            sendClientError(res, 'You are already a member of this group');
          } else {
            sendServerError(res, error.message);
          }
        }
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};



  // export const updateGroupControllers = async (req, res) => {
  //   try {
  //     const { GroupName,Description } = req.body;
  //     const { GroupID } = req.params;

  //     const CreatedDate = new Date();    
  //     const { error } = updateGroupValidator({ GroupName,Description });
  //     if (error) {
  //       return res.status(400).json({ error: error.details[0].message });
  //     }
  
  //     const updatedGroup = await updateGroupNameService({ GroupID,GroupName,Description,CreatedDate });
  //     console.log('Updated one',updatedGroup);
  //     if (updatedGroup.error) {
  //       return sendServerError(res, updatedGroup.error);
  //     }
  
  //     return sendCreated(res, 'Group updated successfully');
  //   } catch (error) {
  //     return sendServerError(res, 'Internal server error');
  //   }
  // };
  

  export const getSingleGroupMemberController=async(req,res)=>{
    try {
      const {MemberID}=req.params
      const singleGroupMembers=await getSingleGroupMemberServices(MemberID)
      
      console.log('single',singleGroupMembers); 
      res.status(200).json({ GroupMember: singleGroupMembers });

    } catch (error) {
      return error
    }
  }



  export const getAllGroupMembersController = async (req, res) => {
    try {
      const {GroupID}=req.params
      const results = await getAllGroupMembersService(GroupID)
        const groupMembers=results.recordset
        console.log("groupMembers",groupMembers);
      res.status(200).json( groupMembers );
    } catch (error) {
      console.error("Error fetching all group Members:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteGroupMemberControllers=async(req,res)=>{
    try {
      const {MemberID}=req.params
      const deletedGroupMembers=await deleteGroupMemberServices(MemberID)
      console.log('deleted GroupMembers',deletedGroupMembers); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }

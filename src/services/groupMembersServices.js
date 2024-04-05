
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

//create group members service
export const createGroupMemberService=async(groupmembers)=>{
  
  try {
    const result=await poolRequest()
    .input('GroupID', sql.VarChar,groupmembers.GroupID )
    .input('MemberID', sql.VarChar,groupmembers.MemberID)
    .query('INSERT INTO GroupMembers (GroupID,MemberID) VALUES(@GroupID,@MemberID)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};

// GroupMembers (GroupID, MemberID)
// updating post details based on the id

// export const updateGroupService=async(updateGroup)=>{
//   try {
//     const updatedGroup=await poolRequest()
//     .input('GroupID', sql.VarChar,updateGroup.GroupID )
//     .input('GroupName', sql.VarChar,updateGroup.GroupName)
//     .input('Description', sql.VarChar,updateGroup.Description)
//     .input('CreatedDate', sql.DateTime,updateGroup.CreatedDate)
//     .query(`UPDATE tbl_group SET GroupID=@GroupID, GroupName = @GroupName,Description=@Description, CreatedDate = @CreatedDate  WHERE  GroupID=@GroupID`)
//     console.log(updatedGroup);
//     return updatedGroup
  
//   } catch (error) {
//     return error
//   }
// }

// fetching single group member
export const getSingleGroupMemberServices=async(MemberID)=>{
  const singleGroupMembers= await poolRequest()
  .input('MemberID', sql.VarChar,MemberID)
  .query(`SELECT GroupMembers.*, tbl_group.*, tbl_user.*
  FROM GroupMembers
  JOIN tbl_group ON GroupMembers.GroupID = tbl_group.GroupID
  JOIN tbl_user ON GroupMembers.MemberID = tbl_user.UserID WHERE MemberID = @MemberID`)
  console.log('single groupmembers',singleGroupMembers.recordset);
  console.log(singleGroupMembers);
  return singleGroupMembers;
}


export const checkingExistingGroupMember=async(groupMember)=>{
 try {
  const checkingExistingMember=await poolRequest()
  .input('MemberID', sql.VarChar,groupMember.MemberID)
  .input('GroupID',sql.VarChar,groupMember.GroupID)
  .query('SELECT * FROM GroupMembers WHERE GroupID=@GroupID AND MemberID=@MemberID')
    return checkingExistingMember

 } catch (error) {
  return error  
 }
}
// SELECT * FROM GroupMembers  WHERE GroupID = 1


// Fetching all available group members in the database
export const getAllGroupMembersService=async(GroupID)=>{
    try {
        const allGroupMembers=await poolRequest()
        .input('GroupID',sql.VarChar,GroupID)
        .query(`SELECT GroupMembers.*,tbl_group.*,tbl_user.*
      FROM GroupMembers
      JOIN tbl_group ON GroupMembers.GroupID = tbl_group.GroupID
      JOIN tbl_user ON GroupMembers.MemberID = tbl_user.UserID
      WHERE GroupMembers.GroupID = @GroupID  
        `)
        console.log();
        return allGroupMembers
    } catch (error) {
        return error
    }
}

//deleting group member
export const deleteGroupMemberServices=async(groupmembers)=>{
  const deletedGroupMember= await poolRequest()
  .input('GroupID', sql.VarChar,groupmembers.GroupID)
  .input('MemberID', sql.VarChar,groupmembers.MemberID)
  .query('DELETE FROM GroupMembers WHERE GroupID = @GroupID AND MemberID = @MemberID')
  console.log('single groupmember',deletedGroupMember.recordset);
  return deletedGroupMember.recordset;
}
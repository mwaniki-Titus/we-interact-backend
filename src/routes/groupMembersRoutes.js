import {Router} from 'express';
import {createGroupMembersController, deleteGroupMemberControllers, getAllGroupMembersController, getSingleGroupMemberController} from '../controllers/groupMembersControllers.js'

const groupMemberRouter=Router();

groupMemberRouter.post('/members', createGroupMembersController)

groupMemberRouter.get('/members/:GroupID', getAllGroupMembersController)

groupMemberRouter.get('/members/single/:MemberID', getSingleGroupMemberController )

// groupMemberRouter.put('/members/update/:GroupMemberID', )

// groupMemberRouter.patch('/members/patch/:GroupMemberID', )

groupMemberRouter.delete('/members/delete/:MemberID', deleteGroupMemberControllers)


export default groupMemberRouter;
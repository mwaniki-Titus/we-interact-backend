
  import { v4 } from "uuid";
  import {sendServerError,sendCreated, notAuthorized} from '../helpers/helperFunctions.js'
import { createStatusService, getAllStatusService, getSingleStatusServices, updateStatusService } from "../services/statusServices.js";
import { createStatusValidator, updateStatusValidator } from "../validators/StatuValidators.js";
  

  export const getAllStatusController = async (req, res) => {
    try {
      const results = await getAllStatusService();
      const Status = results.recordset;
      console.log("status", Status);
      return res.status(200).json(Status);
    } catch (error) {
      console.error("Error fetching all status:", error);
      return res.status(500).json("Internal server error");
    }
  };
  
  export const createNewStatusController = async (req, res) => {
    try {
      const {UserID,StatusText,ImagePath } = req.body;
      console.log(req.body);

     
      const { error } = createStatusValidator({ UserID,StatusText,ImagePath } );
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {

        const CreatedAt=new Date();
        const StatusID = v4();
       
        
        const result = await createStatusService({StatusID,CreatedAt,UserID,StatusText,ImagePath});
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Status created successfully');
      }
      }
  
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  

  
  
  export const updateStatusControllers = async (req, res) => {
    try {
      const { StatusText,ImagePath} = req.body;
  
      const { StatusID } = req.params;
      console.log("StatusID id",StatusID);
      const existingStatus = await getSingleStatusServices(StatusID);
  
      if (existingStatus.rowsAffected[0] === 0) {
        return res.status(400).json({ message: "User not found" });
      }else{
  
      const { error } = updateStatusValidator({ StatusText,ImagePath});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const updatedStatus = await updateStatusService({ StatusText,ImagePath,StatusID});
      console.log('Updated one', updatedStatus);
  
      if (updatedStatus.error || updatedStatus.rowsAffected<1) {
        return sendServerError(res, updatedStatus.error);
      }
      return sendCreated(res, 'Status updated successfully');
    }
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  
  

  
  
  export const getSingleStatusController=async(req,res)=>{
    try {
      const {StatusID}=req.params
      const singleStatus=await getSingleStatusServices(StatusID)
      if(singleStatus.rowsAffected==0){
        res.status(400).json({message:"status Not found"})
    }else{
      const result=singleStatus.recordset[0]
      return res.status(200).json(result );
    } 
      
    } catch (error) {
      return error
    }
  }
  
  
  
  export const deleteUserController=async(req,res)=>{
    try {
      const {StatusID}=req.params
      const existingStatus=await getSingleStatusServices(StatusID)
      if(existingStatus.rowsAffected>0){
        const deletedStatus=await deleteUserServices(StatusID)
        console.log("deleted status",deletedStatus);
        sendDeleteSuccess(res,"Deleted successfull")
    }else{
      res.status(400).json({message:"status Not found"})
    } 
      
    } catch (error) {
      return error
    }
  }
  
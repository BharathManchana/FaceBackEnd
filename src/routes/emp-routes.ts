import type { Router } from "express";
import {upload} from "@/middlewares/multter.middleware";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { handleAddEmployee, handleUploadImages,userDetails } from "@/controllers/emp-controllers";
import routes from "./routes";

export default createRouter((router: Router)=>{
    router.post('/create',upload.single("profileImage"),handleAddEmployee)
    router.post('/uploadImages',upload.array("employeeImages"),handleUploadImages)
    router.get('/getUser',userDetails)
})


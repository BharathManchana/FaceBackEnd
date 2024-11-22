import { addEmployeeSchema } from '@/schema/employees';
import { createHandler } from '@/utils/create'; 
import { BackendError } from '@/utils/errors';
import { getEmployeeById ,addEmployeeService, uploadEmployeeImagesService} from '@/services/emp-services'; 


export const handleAddEmployee = createHandler(addEmployeeSchema, async (req, res) => {
  const employee = req.body;
  const profileImage = req.file;
  // console.log("Uploaded req .flie in controllers file details:", req.file);
  if (!profileImage) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Profile image file is required(From controleers).',
    });
  }
  // console.log("Details from controllers ",employee);
  const existingEmployee = await getEmployeeById(employee.id);

  if (existingEmployee) {
    // console.log("Employee exists");
    throw new BackendError('CONFLICT', {
      message: 'Employee with this ID already exists',
    });
  }

  const { employee: addedEmployee } = await addEmployeeService({...employee, file: profileImage});
  res
  .status(201)
  .json({ employee: addedEmployee });
});


export const handleUploadImages = createHandler(async(req,res) => {
  const {empId } = req.body;
  const employeeImages = req.files as Express.Multer.File[];

  if(!empId){
    throw new BackendError('BAD_REQUEST',{
      message:'Employee ID is required,',
    });
  }
  
  if (!employeeImages || employeeImages.length === 0) {
    throw new BackendError('BAD_REQUEST', {
      message: 'At least one image file is required.',
    });
  }
  
  const uploadedImages = await uploadEmployeeImagesService(parseInt(empId), employeeImages);

  res.status(201).json({
    message: 'Images uploaded successfully.',
    images: uploadedImages,
  });

});
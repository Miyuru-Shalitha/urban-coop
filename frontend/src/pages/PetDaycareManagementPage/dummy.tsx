// import { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import { useSelector } from "react-redux";
// import axios from "axios";

// import { RootState } from "../../store/store";


// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup
// } from '@mui/material';



// function PetDaycareBookingPage() {
//   const { user } = useSelector((state: RootState) => state.auth);

//   const [pid, setPid] = useState(0);
//   const [bid, setBid] = useState(0);
//   const [total, setTotal] = useState(0);
 


//   const fetchPid = async () => {
//     // const result = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/counter`);
//     // setPid(result.data.count);
//   };

//   const fetchBid = async () => {
//     // const result = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/counter`);
//     // setBid(result.data.count);
//   };

//   // const getid = () => {
//   //   fetchPid();
//   //   return pid;
//   // };

//   // useEffect(() => {
//   //   fetchPid();
//   //   fetchBid();
//   // }, []);

//   type TPet = {
//     name: string;
//     description: string;
//     type: string;
//   }

//   type TFormData = {
//     cus_id: string;
//     customerName: string;
//     email: string;
//     description: string;
//     startDate: Date;
//     endDate: Date;
//     contactNumber: string;
//     petName: string;
//     petType: string;

//   }

//   const [formData, setFormData] = useState<TFormData>({
//     cus_id: user._id,
//     customerName: "",
//     email: "",
//     description: "",
//     startDate: new Date(),
//     endDate: new Date(),
//     contactNumber: "",
//     petName: "",
//     petType: "",
//   });


//   const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   }



//   return (
//     <>
//       <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
//         <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">


//           <form onSubmit={
//             (event) => {
//               event.preventDefault();
//               // 1. Validate the form data
//               // 2. if valid, send the data to the backend
//               // 3. if the response is successful, show the total price
//               console.log(formData);
//               // 4.open the modal to ask for transportation
//               setShowAskTransportModal(true);
//               console.log("Form submitted");
//             }
//           }>


//             <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">


//                <TextField 
//                 id="outlined-basic"
//                 label="name"
//                 name="name"
//                 variant="outlined"
//                 value={formData.customerName}    
//                 required={true}
//                />

//               <TextField 
//                 id="outlined-basic"
//                 label="email"
//                 name="email"
//                 variant="outlined"
//                 value={formData.email}   
//                 required={true}
//                />

//               <TextField
//                 id="outlined-basic"
//                 label="Contact number"
//                 name="contactNumber"
//                 variant="outlined"
//                 type="phone"
//                 value={formData.contactNumber}
//                 required={true}
//                 onChange={onChangeHandler}
//               />

            

//               <TextField
//                 label="Start Date"
//                 name="startDate"
//                 type="date"
//                 id="start"
//                 value={new Date(formData.startDate).toISOString().substr(0, 10)}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 inputProps={{
//                   min: new Date().toISOString().substr(0, 10),
//                 }}
//                 onChange={onChangeHandler}
//               />

//               <TextField
//                 label="End Date"
//                 name="endDate"
//                 type="date"
//                 id="start"
//                 value={new Date(formData.endDate).toISOString().substr(0, 10)}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 inputProps={{
//                   min: new Date().toISOString().substr(0, 10),
//                 }}
//                 onChange={onChangeHandler}
//               />

//               <TextField
//                 id="outlined-basic"
//                 name="petName"
//                 label="Pet Name"
//                 variant="outlined"
//                 value={formData.petName}
//                 required={true}
//                 onChange={onChangeHandler}
//               />
             

//              <TextField
//                 id="outlined-basic"
//                 name="description"
//                 label="Description"
//                 variant="outlined"
//                 value={formData.description}
//                 required={true}
//                 onChange={onChangeHandler}
//               />

// <FormControl component="fieldset">
//         <FormLabel component="legend">Pet Type</FormLabel>
//         <RadioGroup
//             aria-label="petType"
//             name="petType"
//             value={formData.petType}
//             onChange={onChangeHandler} // Attach the onChange handler
//         >
//             <FormControlLabel value="dog" control={<Radio />} label="Dog" />
//             <FormControlLabel value="cat" control={<Radio />} label="Cat" />
//         </RadioGroup>
//     </FormControl>




//             </div>



            

            


//             <div className="mb-6">
//               <h2 className="md">Estimated price: Rs:{total}</h2>
//             </div>

//             <div className="flex items-start mb-6">
//               <div className="flex items-center h-5">
//                 <input
//                   id="remember"
//                   type="checkbox"
//                   value=""
//                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
//                 />
//               </div>
//               <label
//                 htmlFor="remember"
//                 className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
//               >
//                 I agree with the{" "}
//                 <a
//                   href="#"
//                   className="text-blue-600 hover:underline dark:text-blue-500"
//                 >
//                   terms and conditions
//                 </a>
//                 .
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="flex ml-auto text-[15px] w] rounded-[5px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>


//     </>
//   );
// }

// export default PetDaycareBookingPage;
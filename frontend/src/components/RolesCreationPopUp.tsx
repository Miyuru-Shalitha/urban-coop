// import { FormEvent, useState } from "react";
// import FilledButton from "./Common/FilledButton";
// import InputField from "./Common/InputField";
// import OutlinedButton from "./Common/OutlinedButton";
// import { createRole } from "../services/employeeService";
// import LoadingIndicator from "./LoadingIndicator";

// export default function RoleCreationPopUp({
//   setIsVisible,
// }: {
//   setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const [role, setRole] = useState({
//     name: "",
//     basicSalary: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     await createRole(role.name, parseFloat(role.basicSalary));
//     setIsLoading(false);
//   };

//   return (
//     <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
//       <div className="absolute h-full w-full bg-grayAlpha1"></div>

//       <form
//         className="absolute flex flex-col gap-2 bg-white px-16 py-16 rounded w-1/2"
//         onSubmit={handleSubmit}
//       >
//         <InputField
//           type="text"
//           label="Role"
//           value={role.name}
//           onChange={(e) => setRole({ ...role, name: e.target.value })}
//           required={true}
//         />
//         <InputField
//           type="number"
//           label="Basic Salary"
//           value={role.basicSalary}
//           onChange={(e) => setRole({ ...role, basicSalary: e.target.value })}
//           required={true}
//         />

//         <div className="flex gap-2">
//           <FilledButton
//             className="text-base relative"
//             type="submit"
//             disabled={isLoading}
//           >
//             <span>Add Role</span>
//             {isLoading && (
//               <LoadingIndicator className="absolute top-2.5 right-2" />
//             )}
//           </FilledButton>

//           <OutlinedButton
//             className="text-base"
//             onClick={() => setIsVisible(false)}
//           >
//             Cancel
//           </OutlinedButton>
//         </div>
//       </form>
//     </div>
//   );
// }

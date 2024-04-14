import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../store/store";



function PetDaycareBookingPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [pid, setPid] = useState(0);
  const [bid, setBid] = useState(0);
  const [total, setTotal] = useState(0);
  const [isDateValid, setIsDateValid] = useState(false);
  const [showAskTransportModal, setShowAskTransportModal] = useState(false);
  const [showTransportModal, setshowTransportModal] = useState(false);


  const fetchPid = async () => {
    // const result = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/counter`);
    // setPid(result.data.count);
  };

  const fetchBid = async () => {
    // const result = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/counter`);
    // setBid(result.data.count);
  };

  // const getid = () => {
  //   fetchPid();
  //   return pid;
  // };

  // useEffect(() => {
  //   fetchPid();
  //   fetchBid();
  // }, []);

  type TPet = {
    name: string;
    description: string;
    type: string;
  }

  type TFormData = {
    cus_id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    petCount: number;
    pets: TPet[];
    contactNumber: string;
    pickupTime: string;
    pickupLocation: string;
  }

  const [formData, setFormData] = useState<TFormData>({
    cus_id: user._id,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    petCount: 0,
    pets: [],
    contactNumber: "",
    pickupTime: "",
    pickupLocation: "",
  });



  // const handleSliderChange = (event) => {
  //   const { value } = event.target;
  //   const numMiniForms = parseInt(value);
  //   const miniForms = formData.mini.slice(0, numMiniForms);
  //   while (miniForms.length < numMiniForms) {
  //     miniForms.push({ name: "", description: "", type: "cat" });
  //   }
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     petCount: numMiniForms,
  //     mini: miniForms,
  //     total: total,
  //   }));

  //   calculateTotal();
  // };

  // const handleMainInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //     total: total,
  //   }));

  //   calculateTotal();
  // };

  // const handleTransportChange = (event) => {
  //   const { name, value } = event.target;
  //   settFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const rememberChecked = document.getElementById("remember").checked;

  //   const isNumberAndTenDigit = (str) => {
  //     return /^\d{10}$/.test(str);
  //   };

  //   if (formData.petCount === 0) {
  //     toast.error("Number of pets can't be zero");
  //     return;
  //   }
  //   if (rememberChecked) {
  //     if (!isNumberAndTenDigit(formData.contactNumbers)) {
  //       toast.error("Please enter a valid contact number");
  //       return;
  //     }
  //     if (!isDateValid) {
  //       toast.error("Please enter a valid date range");
  //       return;
  //     }
  //     try {
  //       bookingServices.addBooking(formData);
  //       toast.success("Booking added successfully");
  //       setshowaskTransportModal(true);

  //       setFormData({
  //         cus_id: user._id,
  //         cus_name: user.name,
  //         bid,
  //         token: user.token,
  //         bid: 0,
  //         petCount: 0,
  //         mini: [{ name: "", description: "", type: "cat", pid: 0 }],
  //         contactNumbers: "",
  //         description: "",
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       });
  //       setTotal(0);
  //     } catch (error) {
  //       toast.error("Something went wrong");
  //     }
  //   } else {
  //     toast.error("Please agree to the terms and conditions");
  //   }
  // };

  // const submitTransportation = () => {
  //   const isNumberAndTenDigit = (str) => {
  //     return /^\d{10}$/.test(str);
  //   };

  //   const { userName, plocation, time, phone } = tformData;
  //   console.log(phone);
  //   if (userName && plocation && time && phone) {
  //     console.log(phone);

  //     if (isNumberAndTenDigit(tformData.phone)) {
  //       axios
  //         .post(`${process.env.REACT_APP_BACKEND_API}api/transport/`, tformData)
  //         .then((res) => {
  //           toast.success("Transportation Request sent");
  //           genarateQRcode();
  //         })
  //         .catch((err) => alert(err));
  //       setshowTransportModal(false);
  //     } else {
  //       toast.error("Please enter a valid contact number");
  //     }
  //   } else {
  //     toast.error("Please fill all the fields");
  //   }
  // };

  // const calculateTotal = () => {
  //   const startDate = new Date(formData.startDate);
  //   const endDate = new Date(formData.endDate);

  //   if (startDate > endDate) setIsDateValid(false);
  //   else setIsDateValid(true);

  //   const diffTime = Math.abs(endDate - startDate);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   setTotal(diffDays * formData.petCount * 2000);
  // };

  // const handleMapClick = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
  //         fetch(apiURL)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             const address = data.results[0].formatted_address;
  //             settFormData((prevData) => ({ ...prevData, plocation: address }));
  //             console.log(tformData);
  //           })
  //           .catch((error) => console.log(error));
  //       },
  //       (error) => console.log(error)
  //     );
  //   }
  // };

  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">


          <form onSubmit={
            (event) => {
              event.preventDefault();
              // 1. Validate the form data
              // 2. if valid, send the data to the backend
              // 3. if the response is successful, show the total price
              console.log(formData);
              // 4.open the modal to ask for transportation
              setShowAskTransportModal(true);
              console.log("Form submitted");
            }
          }>


            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">


               <TextField 
                id="outlined-basic"
                label="name"
                name="name"
                variant="outlined"
                value={user.username}    
                required={true}
                disabled={true}
               />

              <TextField 
                id="outlined-basic"
                label="email"
                name="email"
                variant="outlined"
                value={user.email}   
                required={true}
                disabled={true}
               />

              <TextField
                id="outlined-basic"
                label="Contact number"
                name="contactNumber"
                variant="outlined"
                type="phone"
                value={formData.contactNumber}
                required={true}
                onChange={onChangeHandler}
              />

              <TextField
                id="outlined-basic"
                name="description"
                label="Description"
                variant="outlined"
                value={formData.description}
                required={true}
                onChange={onChangeHandler}
              />

              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                id="start"
                value={new Date(formData.startDate).toISOString().substr(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().substr(0, 10),
                }}
                onChange={onChangeHandler}
              />

              <TextField
                label="End Date"
                name="endDate"
                type="date"
                id="start"
                value={new Date(formData.endDate).toISOString().substr(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().substr(0, 10),
                }}
                onChange={onChangeHandler}
              />
            </div>

            {<h2 className="mt-5">Number of pets: {formData.petCount}</h2>}
            <div>
              <Slider
                aria-label="Number of pets"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={6}
                value={formData.petCount}
                onChange={(event, value) => {
                  if (typeof value === 'number') {
                    if (value > 0) {
                      setFormData({
                        ...formData,
                        pets: new Array(value).fill({ name: "", description: "", type: "cat" }) as any,
                      })
                    }else{
                      setFormData({
                        ...formData,
                        pets: [],
                      })
                    }
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      petCount: value,
                    }));
                  }
                }}
              />
            </div>

            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-2">
              {formData.pets.map((pet, index) => (
                <div key={index} className="grid gap-4">
                  <label>
                    <TextField
                      label="Enter Name"
                      variant="outlined"
                      required={true}
                      value={formData.pets[index]?.name || ""}
                      style={{ width: "100%" }}
                      onChange={
                        (event) => {
                          const { value } = event.target;
                          setFormData((prevFormData) => {
                            const newPets = [...prevFormData.pets];
                            newPets[index] = {
                              ...newPets[index],
                              name: value,
                            };
                            return {
                              ...prevFormData,
                              pets: newPets,
                            };
                          });
                        }
                      }
                    />
                  </label>

                  <label>
                    <TextField
                      value={formData.pets[index]?.description || ""}
                      label="Enter description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={
                        (event) => {
                          const { value } = event.target;
                          setFormData((prevFormData) => {
                            const newPets = [...prevFormData.pets];
                            newPets[index] = {
                              ...newPets[index],
                              description: value,
                            };
                            return {
                              ...prevFormData,
                              pets: newPets,
                            };
                          });
                        }
                      }
                    />
                  </label>

                  <label>
                    <FormControl fullWidth>
                      <InputLabel id="mini-form">Type</InputLabel>
                      <Select
                        labelId="mini-form-type-label"
                        value={formData.pets[index]?.type || ""}
                        label="Type"
                        onChange={
                          (event) => {
                            const { value } = event.target;
                            setFormData((prevFormData) => {
                              const newPets = [...prevFormData.pets];
                              newPets[index] = {
                                ...newPets[index],
                                type: value,
                              };
                              return {
                                ...prevFormData,
                                pets: newPets,
                              };
                            });
                          }
                        }
                      >
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="dog">Dog</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="md">Estimated price: Rs:{total}</h2>
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="flex ml-auto text-[15px] w] rounded-[5px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>


      {showTransportModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-[500px]">
            <h2 className="text-lg font-bold mb-4">
              Add Transportation Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextField
                id="outlined-basic"
                label="Customer name"
                name="userName"
                variant="outlined"
                value={user.username}
                disabled={true}
                required={true}
              />
              <TextField
                label="Date of pickyp"
                name="date"
                type="date"
                id="start"
                value={new Date(formData.startDate).toISOString().substr(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().substr(0, 10),
                }}
                required={true}
                disabled={true}
              />
              <TextField
                id="outlined-basic"
                label="Contact number"
                name="phone"
                variant="outlined"
                value={formData.contactNumber}
                disabled={true}
                required={true}
              />
              <TextField
                id="outlined-basic"
                label="Pick up time"
                name="pickupTime"
                variant="outlined"
                type="time"
                value={formData.pickupTime}
                required={true}
                onChange={onChangeHandler}
              />
              <TextField
                id="outlined-basic"
                label="Pick up location"
                name="pickupLocation"
                variant="outlined"
                value={formData.pickupLocation}
                required={true}
                onChange={onChangeHandler}
                className="w-[300px]"
              />

            </div>
            <div className="flex mt-7">
              <button
                type="button"
                className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>
              <button
                type="submit"

                className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showAskTransportModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">
              Would you like to request Transport for your pets
            </h2>
            <div className="flex">
              <button

                type="submit"
                className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Skip
              </button>
              <button
                type="submit"
                onClick={() => {
                  setShowAskTransportModal(false);
                  setshowTransportModal(true)
                }}
                className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PetDaycareBookingPage;
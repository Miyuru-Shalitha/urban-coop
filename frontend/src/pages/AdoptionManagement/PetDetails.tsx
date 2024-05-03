import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import AdoptRequestModal from "./AdoptRequestModal";

interface IPetDetails {
    _id: string;
    name: string;
    age: number;
    species: string;
    breed: string;
    gender: string;
    color: string;
    adoptionStatus: string;
    description: string;
    imgUrl: string;
    updatedAt?: string;
}

interface INewAdoptRequest {
    petId: string;
    petName: string;
    requesterName: string;
    requesterEmail: string;
    requesterPhone: string;
    requesterAddress: string;
    requesterPetExperience: string;
    reasonForAdoption: string;
    status: string;
}

const PetDetails: React.FC = () => {
    const { petId } = useParams<{ petId: string }>();
    const [petDetails, setPetDetails] = useState<IPetDetails | null>(null);
    const [adoptRequestModalOpen, setAdoptRequestModalOpen] = useState(false);

    useEffect(() => {
        // fetch pet details from the backend
        axios.get(`http://localhost:5000/api/pets/${petId}`)
            .then(response => {
                setPetDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
            });
    }, [petId]);

    const addNewAdoptRequest = (newAdoptRequestData: INewAdoptRequest) => {
        axios.post('http://localhost:5000/api/adoptionrequests', newAdoptRequestData)
            .then(response => {
                console.log('Adoption request added successfully:', response.data);
                Swal.fire('Success!', 'Your adoption request has been submitted successfully.', 'success');
                setAdoptRequestModalOpen(false);
            })
            .catch(error => {
                //console.error('Error adding adoption request:', error);
                Swal.fire('Error!', 'Failed to submit your adoption request. Please try again.', error);
            });
    };


    if (!petDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white flex flex-col shadow-lg rounded-lg overflow-hidden w-full h-[600px] items-center justify-center">
            <h1 className="text-4xl font-semibold text-gray-800">Pet Details</h1>
            <div className="px-4 py-2 w-5/6 grid grid-cols-2 gap-24 mt-8 ">
                <div className="div">
                    <img
                        src={petDetails.imgUrl}
                        alt={petDetails.name}
                        className="w-full h-96 object-cover object-center rounded-xl"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="">
                        <h2 className="text-3xl font-semibold text-gray-800">{petDetails.name}</h2>
                    </div>
                    <div className="flex flex-col justify-between w-full gap-3 mt-4 ">
                        <div className="grid grid-cols-2 gap-0">
                            <p className="text-gray-700 text-xl"><span className="font-bold">Species: </span>{petDetails.species}</p>
                            <p className="text-gray-700 text-xl"><span className="font-bold">Breed: </span>{petDetails.breed}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <p className="text-gray-700 text-xl"><span className="font-bold">Age: </span>{petDetails.age}</p>
                            <p className="text-gray-700 text-xl"><span className="font-bold">Gender: </span>{petDetails.gender}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <p className="text-gray-700 text-xl"><span className="font-bold">Color: </span>{petDetails.color}</p>
                            <p className="text-gray-700 text-xl"><span className="font-bold">Adoption Status: </span>{petDetails.adoptionStatus}</p>
                        </div>
                        <p className="text-gray-700 text-xl text-justify"><span className="font-bold">Description: </span>{petDetails.description}</p>
                    </div>
                    {/* Adoption request button */}
                    <button
                        className="block w-full bg-primary hover:bg-amber-400 text-black py-2 mt-4 rounded-lg"
                        onClick={() => setAdoptRequestModalOpen(true)}
                    >
                        Request to Adopt
                    </button>
                    {adoptRequestModalOpen && (
                        <AdoptRequestModal
                            isOpen={adoptRequestModalOpen}
                            closeModal={() => setAdoptRequestModalOpen(false)}
                            saveAdoptRequest={addNewAdoptRequest}
                            petId={petDetails._id}
                            petName={petDetails.name}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
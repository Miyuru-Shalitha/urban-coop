import React, { useState } from "react";

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

interface AdoptRequestModalProps {
    isOpen: boolean;
    closeModal: () => void;
    saveAdoptRequest: (request: INewAdoptRequest) => void;  
    initialRequest?: INewAdoptRequest;  
    petId: string;
    petName: string;
}

const AdoptRequestModal: React.FC<AdoptRequestModalProps> = ({ closeModal, saveAdoptRequest, initialRequest, petId, petName }) => {
    const [adoptRequest, setAdoptRequest] = useState<INewAdoptRequest>(initialRequest || {
        petId: petId,
        petName: petName,
        requesterName: '',
        requesterEmail: '',
        requesterPhone: '',
        requesterAddress: '',
        requesterPetExperience: '',
        reasonForAdoption: '',
        status: 'Pending'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdoptRequest({ ...adoptRequest, [name]: value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAdoptRequest({ ...adoptRequest, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveAdoptRequest(adoptRequest);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/6 shadow-lg rounded-md bg-white">
                <div className="mt-3 ">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Request to Adopt</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="requesterName" placeholder="Enter your name" value={adoptRequest.requesterName} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="requesterEmail" placeholder="Enter your Email" value={adoptRequest.requesterEmail} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="requesterPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" name="requesterPhone" placeholder="Phone" value={adoptRequest.requesterPhone} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="requesterAddress" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" name="requesterAddress" placeholder="Address" value={adoptRequest.requesterAddress} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="requesterPetExperience" className="block text-sm font-medium text-gray-700">Previous Pet Experiences </label>
                                    <textarea name="requesterPetExperience" placeholder="Enter your previous pet experiences" value={adoptRequest.requesterPetExperience} onChange={handleTextAreaChange} className="w-full p-2 border rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="reasonForAdoption" className="block text-sm font-medium text-gray-700">Reason for Adoption</label>
                                    <textarea name="reasonForAdoption" placeholder="Reason for Adoption" value={adoptRequest.reasonForAdoption} onChange={handleTextAreaChange} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-primary hover:bg-primaryAccent text-black font-bold py-2 px-4 rounded">
                                    Send Request
                                </button>
                                <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded ml-2">
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdoptRequestModal;
import { useEffect, useState } from "react";

interface IAdoptionRequest {
    _id: string;
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

interface ShowRequestModalProps {
    isOpen: boolean;
    closeModal: () => void;
    updateRequest: (request: IAdoptionRequest) => void;
    initialRequest?: IAdoptionRequest | null;
}

const ShowRequestModal: React.FC<ShowRequestModalProps> = ({ isOpen, closeModal, updateRequest, initialRequest }) => {
    const [request, setRequest] = useState<IAdoptionRequest>({
        _id: '',
        petId: '',
        petName: '',
        requesterName: '',
        requesterEmail: '',
        requesterPhone: '',
        requesterAddress: '',
        requesterPetExperience: '',
        reasonForAdoption: '',
        status: ''
    });

    useEffect(() => {
        if (initialRequest) {
            setRequest(initialRequest);
        }
    }, [initialRequest]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed insert-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full">
            <div className="relative top-20 ml-72 p-5 border w-3/6 shadow-lg rounded-md bg-white">
                <h1 className="text-2xl font-semibold text-center mb-4">Adoption Request</h1>
                <p className="text-lg "><span className="font-semibold ">Pet Name: </span> {request.petName}</p>
                <p className="text-lg "><span className="font-semibold">Requester Name: </span>{request.requesterName}</p>
                <p className="text-lg "><span className="font-semibold">Requester Email: </span>{request.requesterEmail}</p>
                <p className="text-lg "><span className="font-semibold">Requester Phone: </span>{request.requesterPhone}</p>
                <p className="text-lg "><span className="font-semibold">Requester Address: </span>{request.requesterAddress}</p>
                <p className="text-lg "><span className="font-semibold">Requester Pet Experience: </span>{request.requesterPetExperience}</p>
                <p className="text-lg "><span className="font-semibold">Reason For Adoption: </span>{request.reasonForAdoption}</p>
                <hr className="my-4" />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateRequest(request);
                    closeModal();
                }}>
                    <div className="mb-4">
                        <label htmlFor="status" className="block font-medium text-black text-lg">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={request.status}
                            onChange={handleSelectChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
                        <button onClick={closeModal} type="button" className="bg-red-600 text-white px-4 py-2 rounded-md ml-4">Close</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ShowRequestModal;
        

    
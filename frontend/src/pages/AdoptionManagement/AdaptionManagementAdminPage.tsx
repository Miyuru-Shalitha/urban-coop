import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ShowRequestModal from "./ShowRequestModal";

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
    updatedAt?: string;
}

const AdaptionManagementAdminPage: React.FC = () => {
    const [adoptionRequests, setAdoptionRequests] = useState<IAdoptionRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [showRequestModalOpen, setShowRequestModalOpen] = useState(false);
    const [currentRequest, setCurrentRequest] = useState<IAdoptionRequest | null>(null);

    useEffect(() => {
        fetchAdoptionRequests();
    }, []);

    const fetchAdoptionRequests = async () => {
        try {
            const { data } = await axios.get<IAdoptionRequest[]>('http://localhost:5000/api/adoptionrequests');
            setAdoptionRequests(data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this adoption request. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/adoptionrequests/${id}`)
                    .then(() => {
                        setAdoptionRequests(adoptionRequests.filter(request => request._id !== id));
                        // Display success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Adoption request deleted successfully.'
                        });
                    })
                    .catch(error => {
                        // Display error message
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message || 'Failed to delete adoption request.'
                        });
                    });
            } 
        });
    };

    const updateRequest = (request: IAdoptionRequest) => {
        axios.put(`http://localhost:5000/api/adoptionrequests/${request._id}`, request)
            .then(() => {
                setAdoptionRequests(adoptionRequests.map(req => req._id === request._id ? request : req));
                setShowRequestModalOpen(false);
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Adoption request updated successfully.'
                });
            })
            .catch(error => {
                // Display error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to update adoption request.'
                });
            });
    }

    const handleShowRequest = (request: IAdoptionRequest) => {
        setCurrentRequest(request);
        setShowRequestModalOpen(true);
    };

    const handleExportPDF = () => {
        const input = document.getElementById('adoption-requests-table');
        if (input) {
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('adoption-requests.pdf');
                });
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            {showRequestModalOpen && currentRequest && (<ShowRequestModal isOpen={showRequestModalOpen} closeModal={() => setShowRequestModalOpen(false)} updateRequest={updateRequest} initialRequest={currentRequest} />)}
            <div className="py-8">
                <h2 className="text-4xl leading-tight">Adoption Requests Management</h2>
                
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-4 overflow-x-auto" id="adoption-requests-table"> 
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Pet Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Requester Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Requester Email
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {adoptionRequests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {request.petName}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {request.requesterName}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {request.requesterEmail}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {request.status}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleShowRequest(request)} className="text-primary hover:text-primaryAccent mr-2">
                                            Show Request
                                        </button>
                                        <button onClick={() => handleDelete(request._id)} className="text-red-600 hover:text-red-900 ml-6">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={handleExportPDF} className="bg-primary hover:bg-primaryAccent text-black font-bold py-2 px-4 rounded">
                        Download Request Report (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdaptionManagementAdminPage;

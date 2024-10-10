import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import PetModal from "./AddPetModel";
import EditPetModel from "./EditPetModel";

interface IPet {
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

interface INewPet {
    name: string;
    age: number;
    species: string;
    breed: string;
    gender: string;
    color: string;
    adoptionStatus: string;
    description: string;
    imgUrl: string;
}

const PetsManagementAdminPage: React.FC = () => {
    const [pets, setPets] = useState<IPet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<IPet | null>(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const { data } = await axios.get<IPet[]>('http://localhost:5000/api/pets');
            setPets(data);
            console.log(data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this pet. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/pets/${id}`)
                    .then(() => {
                        setPets(pets.filter(pet => pet._id !== id));
                        // Display success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Pet deleted successfully.'
                        });
                    })
                    .catch(error => {
                        // Display error message
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message || 'Failed to delete pet.'
                        });
                    });
            } 
        });
    };

    const addNewPet = (newPetData: INewPet) => {
        axios.post('http://localhost:5000/api/pets', newPetData)
            .then(({ data }) => {
                setPets([...pets, data]);
                setAddModalOpen(false);
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Pet added successfully.'
                });
            })
            .catch(error => {
                // Display error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to add pet.'
                });
            });
    };

    const handleEdit = (pet: IPet) => {
        setCurrentPet(pet);
        setEditModalOpen(true);
    };

    const updatePet = (updatedPet: IPet) => {
        axios.put(`http://localhost:5000/api/pets/${updatedPet._id}`, updatedPet)
            .then(({ data }) => {
                setPets(pets.map(pet => pet._id === data._id ? data : pet));
                setEditModalOpen(false);
            })
            .catch(error => {
                alert(error.message);
            });
    };

    // Sort pets by updatedAt in descending order
    const sortedPets = [...pets].sort((a, b) => {
        const aDate = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
        const bDate = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
        return bDate.getTime() - aDate.getTime();
    });

// Function to generate PDF report
    const generatePDF = () => {
        const petReport = document.getElementById('pet-report')!;

        html2canvas(petReport).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.text('Pets Report', 105, 10);
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('pets-report.pdf');
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Pets report downloaded successfully.'
            });
        });
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <h2 className="text-4xl leading-tight">Pets Management</h2>
                <div className="flex flex-row justify-between items-center mb-1 sm:mb-0  w-full">
                    <h3 className="text-2xl font-semibold">Pets List</h3>
                    <button onClick={() => setAddModalOpen(true)} className="flex w-2/12 items-center justify-center   bg-primary hover:bg-primaryAccent text-black font-bold py-2 mt-4 text-xl rounded">
                        + Add Pet
                    </button>
                </div>
                <PetModal isOpen={addModalOpen} closeModal={() => setAddModalOpen(false)} savePet={addNewPet} />
                {currentPet && <EditPetModel isOpen={editModalOpen} closeModal={() => setEditModalOpen(false)} updatePet={updatePet} initialPet={currentPet} />}
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-4 overflow-x-auto " id="pet-report">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Species
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Breed
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Age
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Color
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPets.map((pet) => (
                                <tr key={pet._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.species}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.breed}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.gender}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.age}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {pet.color}
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleEdit(pet)} className="text-primary hover:text-primaryAccent">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(pet._id)} className="text-red-600 hover:text-red-900 ml-4">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={generatePDF} className="bg-primary hover:bg-primaryAccent text-black font-bold py-2 px-4 rounded">
                        Download Pets Report (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetsManagementAdminPage;

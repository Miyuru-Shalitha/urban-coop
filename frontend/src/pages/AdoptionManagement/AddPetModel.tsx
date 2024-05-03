import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";
import Swal from 'sweetalert2';
import { storage } from '../../firebaseConfig';

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

interface AddPetModelProps {
    isOpen: boolean;
    closeModal: () => void;
    savePet: (pet: INewPet) => void;  
    initialPet?: INewPet;  
}

const AddPetModel: React.FC<AddPetModelProps> = ({ isOpen, closeModal, savePet, initialPet }) => {
    const [pet, setPet] = useState<INewPet>(initialPet || {
        name: '',
        age: 0,
        species: '',
        breed: '',
        gender: '',
        color: '',
        adoptionStatus: 'Available',
        description: '',
        imgUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const storageRef = ref(storage, `pets/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // progress bar
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setPet({ ...pet, imgUrl: downloadURL });
                    });
                }
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await savePet(pet);
            // Display success message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Pet saved successfully.'
            });
            // Clear form fields
            setPet({
                name: '',
                age: 0,
                species: '',
                breed: '',
                gender: '',
                color: '',
                adoptionStatus: 'Available',
                description: '',
                imgUrl: ''
            });
            closeModal();
        } catch (error) {
            // Display error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error as Error).message || 'Failed to save pet.'
            });
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/6 shadow-lg rounded-md bg-white">
                <div className="mt-3 ">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Add New Pet</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" placeholder="Name" value={pet.name} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                    <input type="number" name="age" min={0} max={20} placeholder="Age" value={pet.age} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
                                    <input type="text" name="species" placeholder="Species" value={pet.species} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
                                    <input type="text" name="breed" placeholder="Breed" value={pet.breed} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select name="gender" value={pet.gender} onChange={handleSelectChange} className="w-full mb-4 p-2 border rounded text-sm font-medium text-gray-700 ">
                                        <option value="" >Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                                    <input type="text" name="color" placeholder="Color" value={pet.color} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" placeholder="Description" value={pet.description} onChange={handleTextAreaChange} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">Image</label>
                                <input type="file" name="imgUrl" onChange={handleImageChange} className="w-full p-2 border rounded" />
                            </div>
                            <div className='mt-6 flex w-full items-center justify-center'>
                                <button type="submit" className="bg-primary hover:bg-primaryAccent text-black font-bold py-2 px-4 rounded">
                                    Save Pet
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
};

export default AddPetModel;
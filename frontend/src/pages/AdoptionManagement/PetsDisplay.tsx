import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "../../components/PetCard";

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
}

const PetsDisplay: React.FC = () => {
    const [allPets, setAllPets] = useState<IPet[]>([]);
    const [filteredPets, setFilteredPets] = useState<IPet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedSpecies, setSelectedSpecies] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await axios.get<IPet[]>('http://localhost:5000/api/pets');
                setAllPets(data);
                setFilteredPets(data); // Initially, filtered pets are same as all pets
                setLoading(false);
            } catch (error: any) {
                setError(error.message || 'An error occurred');
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const updateVisiblePets = (species: string) => {
        setSelectedSpecies(species);
        let newFilteredPets: IPet[];

        if (species === 'all') {
            newFilteredPets = allPets;
        } else if (species === 'others') {
            newFilteredPets = allPets.filter((pet) => pet.species !== 'Dog' && pet.species !== 'Cat');
        } else {
            newFilteredPets = allPets.filter((pet) => pet.species === species);
        }
        setFilteredPets(newFilteredPets);
    };

    // search using name or breed or species or gender or color
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filteredPets = allPets.filter((pet) => {
            return pet.name.toLowerCase().includes(query.toLowerCase()) ||
                pet.breed.toLowerCase().includes(query.toLowerCase()) ||
                pet.species.toLowerCase().includes(query.toLowerCase()) ||
                pet.gender.toLowerCase().includes(query.toLowerCase()) ||
                pet.color.toLowerCase().includes(query.toLowerCase()); 
        });
        setFilteredPets(filteredPets);
    };
            

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full">
            <section id="pets" className="w-full px-[90px] mt-2 mb-10">
                <div className="text-center mt-8">
                    <h1 className="text-4xl font-bold">Available for Adoption</h1>
                    <div className='flex justify-between items-center mt-6'>
                        <div className='flex gap-4'>
                            <button onClick={() => updateVisiblePets('all')} className={`px-4 py-2 rounded-lg ${selectedSpecies === 'all' ? 'bg-primary text-white' : 'bg-white text-primary'} border border-primary`}>All</button>
                            <button onClick={() => updateVisiblePets('Dog')} className={`px-4 py-2 rounded-lg ${selectedSpecies === 'Dog' ? 'bg-primary text-white' : 'bg-white text-primary'} border border-primary`}>Dogs</button>
                            <button onClick={() => updateVisiblePets('Cat')} className={`px-4 py-2 rounded-lg ${selectedSpecies === 'Cat' ? 'bg-primary text-white' : 'bg-white text-primary'} border border-primary`}>Cats</button>
                            <button onClick={() => updateVisiblePets('others')} className={`px-4 py-2 rounded-lg ${selectedSpecies === 'others' ? 'bg-primary text-white' : 'bg-white text-primary'} border border-primary`}>Others</button>
                        </div>
                        <div className='flex items-center bg-white rounded-2xl px-4 py-2 shadow-lg'>
                            <svg className='w-8 h-8 text-gray-500 mr-3' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
                                <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                            </svg>
                            <input
                                className='outline-none bg-transparent text-lg'
                                type='text'
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mt-8 grid grid-cols-4  gap-14'>
                        {filteredPets.map((pet) => (
                            <PetCard
                                key={pet._id}
                                id={pet._id}
                                name={pet.name}
                                breed={pet.breed}
                                age={pet.age}
                                imgUrl={pet.imgUrl}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PetsDisplay;
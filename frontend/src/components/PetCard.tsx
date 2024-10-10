interface IPetCardProps {
    id: string;
    name: string;
    age: number;
    breed: string;
    imgUrl: string;
}

const PetCard: React.FC<IPetCardProps> = ({ id, name, age, breed, imgUrl }) => {
    const handleMoreDetailsClick = () => {
        // navigate to the pet details page
        window.location.href = `pets/${id}`;
    };
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
                src={imgUrl}
                alt={name}
                className="w-full h-56 object-cover object-center"
            />
            <div className="pt-4">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            </div>
            <div className="pb-4 px-4 flex flex-raw justify-between">
                <p className="text-gray-700">Breed: {breed}</p>
                <p className="text-gray-700">Age: {age}</p> 
            </div>
            <button 
                onClick={handleMoreDetailsClick}
                className="block w-full bg-primary hover:bg-amber-400 text-black  py-2">
                More Details
            </button>
        </div>
    );
};

export default PetCard;
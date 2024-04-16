import Header from "../components/Header/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      
      <div className="grid grid-cols-3 gap-[70px] px-[80px] h-[200px] bg-secondary p-[50px]">
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Online Booking
          </h1>
          <p className="text-center text-white">
            Ubern coop online booking system allow users to quickly shedule a
            booking for their pets.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Customer Service
          </h1>
          <p className="text-center text-white">
            Experience exceptional service, tailored just for you.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Fast Pickup
          </h1>
          <p className="text-center text-white">
            Fast pickup, worry-free pet sitting - because your furry friends
            deserve the best
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-secondary pl-[40px] pt-[50px] text-[40px]">
        Our services
      </h1>
      <div
      //TO ADD IMAGE TO THE BACKGROUND
        style={{ backgroundImage: `` }}
        className="snap-start bg-cover bg-center h-screen w-auto"
      ></div>
      
    </>
    
  );
}

import LoadingIndicator from "../components/LoadingIndicator";
import Navbar from "../components/Navbar";
export default function HomePage() {
  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <Navbar/>
      <LoadingIndicator />
    </div>
  );
}

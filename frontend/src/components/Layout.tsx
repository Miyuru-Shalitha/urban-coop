import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

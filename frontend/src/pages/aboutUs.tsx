const AboutUs = () => {
    return (
      <div className="m-16 container mx-auto px-8 pt-8 md:px-6 lg:px-12 font-sans">
        <h1 className="text-3xl font-bold mb-8 text-center">About UberCoop</h1>
  
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg">
            UberCoop was founded in 2020 with a vision to revolutionize the transportation industry. Our founders, John Smith and Emily Johnson, identified a need for reliable, efficient, and affordable transportation solutions that prioritize safety and convenience.
          </p>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            At UberCoop, our mission is to provide seamless transportation experiences for everyone, everywhere. We are committed to leveraging cutting-edge technology to connect riders with trusted drivers, ensuring a comfortable and stress-free journey every time.
          </p>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
  
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 xl:w-1/3 px-4 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-lg">
                Safety is our top priority at UberCoop. We employ rigorous safety measures and vetting processes to ensure that every ride is secure for both riders and drivers. From background checks to vehicle inspections, we leave no stone unturned in ensuring the safety of our community.
              </p>
            </div>
  
            <div className="w-full md:w-1/2 xl:w-1/3 px-4 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-lg">
                We believe transportation should be accessible to all. That's why we offer a range of services tailored to meet the diverse needs of our riders, including options for individuals with disabilities and special requirements. Our commitment to accessibility extends to our drivers as well, providing them with the tools and support they need to serve every rider with dignity and respect.
              </p>
            </div>
  
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-lg">
                Innovation is at the heart of everything we do. We continuously strive to push the boundaries of what's possible, embracing new technologies and ideas to enhance the UberCoop experience. Whether it's developing new features for our app or exploring alternative energy sources for our vehicles, we're always looking for ways to innovate and improve.
              </p>
            </div>
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-lg">
            Our team at UberCoop is comprised of dedicated professionals from diverse backgrounds, united by a shared passion for excellence. From our engineers and developers to our customer support specialists and drivers, each member of the UberCoop family plays a vital role in delivering exceptional service to our community.
          </p>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Join Us</h2>
          <p className="text-lg">
            Interested in joining the UberCoop team? Visit our Careers page to explore exciting opportunities and become part of our mission to transform transportation for the better.
          </p>
        </section>
  
        <p className="text-lg text-center pb-8">
          Thank you for choosing UberCoop! We're proud to be your trusted partner in getting you where you need to go, safely and reliably.
        </p>
      </div>
    );
  };
  
  export default AboutUs;
  
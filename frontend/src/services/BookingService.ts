// bookingServices.ts

// Define types for the booking, pet, and form data
interface Pet {
    name: string;
    description: string;
    type: string;
  }
  
  interface Booking {
    id: number;
    cus_id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    petCount: number;
    pets: Pet[];
    contactNumber: string;
    pickupTime: string;
    pickupLocation: string;
  }
  
  interface FormData {
    cus_id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    petCount: number;
    pets: Pet[];
    contactNumber: string;
    pickupTime: string;
    pickupLocation: string;
  }
  
  class BookingService {
    // Define properties with type annotations
    bookings: Booking[];
    currentBookingId: number;
  
    constructor() {
      // Initialize the in-memory data storage with dummy bookings
      this.bookings = [
        {
          id: 1,
          cus_id: 'user1',
          description: 'Dog grooming and boarding',
          startDate: new Date('2024-05-01'),
          endDate: new Date('2024-05-07'),
          petCount: 2,
          pets: [
            { name: 'Buddy', description: 'Golden Retriever', type: 'dog' },
            { name: 'Bella', description: 'Labrador', type: 'dog' },
          ],
          contactNumber: '1234567890',
          pickupTime: '10:00 AM',
          pickupLocation: '123 Main St, City',
        },
        {
          id: 2,
          cus_id: 'user2',
          description: 'Cat boarding',
          startDate: new Date('2024-06-10'),
          endDate: new Date('2024-06-15'),
          petCount: 1,
          pets: [{ name: 'Whiskers', description: 'Tabby Cat', type: 'cat' }],
          contactNumber: '0987654321',
          pickupTime: '09:00 AM',
          pickupLocation: '456 Elm St, City',
        },
        {
          id: 3,
          cus_id: 'user1',
          description: 'Dog training',
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-07-05'),
          petCount: 1,
          pets: [{ name: 'Max', description: 'Beagle', type: 'dog' }],
          contactNumber: '1234567890',
          pickupTime: '08:00 AM',
          pickupLocation: '789 Pine St, City',
        },
      ];
  
      this.currentBookingId = 4; // Next available booking ID
    }
  
    // Create a new booking
    createBooking(formData: FormData): Booking {
      const newBooking: Booking = {
        id: this.currentBookingId,
        ...formData,
      };
  
      // Increment the booking ID for the next booking
      this.currentBookingId++;
  
      // Add the new booking to the in-memory data storage
      this.bookings.push(newBooking);
  
      // Return the created booking
      return newBooking;
    }
  
    // Fetch bookings for a specific user
    fetchBookingsByUserId(userId: string): Booking[] {
      // Filter bookings based on the user ID
      const userBookings = this.bookings.filter((booking) => booking.cus_id === userId);
      return userBookings;
    }
  
    // Fetch a specific booking by booking ID
    fetchBookingById(bookingId: number): Booking | null {
      // Find the booking in the in-memory data storage
      const booking = this.bookings.find((booking) => booking.id === bookingId);
      return booking ?? null;
    }
  
    // Update a specific booking
    updateBooking(bookingId: number, updatedData: Partial<FormData>): Booking | null {
      // Find the booking index
      const bookingIndex = this.bookings.findIndex((booking) => booking.id === bookingId);
      if (bookingIndex !== -1) {
        // Update the booking data
        this.bookings[bookingIndex] = { ...this.bookings[bookingIndex], ...updatedData };
        return this.bookings[bookingIndex];
      }
      return null;
    }
  
    // Delete a specific booking by booking ID
    deleteBooking(bookingId: number): Booking | null {
      // Find the booking index
      const bookingIndex = this.bookings.findIndex((booking) => booking.id === bookingId);
      if (bookingIndex !== -1) {
        // Remove the booking from the in-memory data storage
        const [removedBooking] = this.bookings.splice(bookingIndex, 1);
        return removedBooking;
      }
      return null;
    }
  }
  
  // Export an instance of the BookingService class
  export const bookingServices = new BookingService();
  
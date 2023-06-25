 // Facility Booking Module

// Define the facility configuration
const facilities = [
    {
      name: 'Clubhouse',
      rates: [
        { start: '10:00', end: '16:00', rate: 100 },
        { start: '16:00', end: '22:00', rate: 500 }
      ]
    },
    {
      name: 'Tennis Court',
      rates: [
        { start: '00:00', end: '24:00', rate: 50 }
      ]
    }
  ];
  
  // Define a booking class to keep track of bookings
  class Booking {
    constructor(facility, date, startTime, endTime, amount) {
      this.facility = facility;
      this.date = date;
      this.startTime = startTime;
      this.endTime = endTime;
      this.amount = amount;
    }
  }
  
  // Define a bookings array to store all bookings
  const bookings = [];
  
  // Function to check if a facility is available for booking
  function isAvailable(facility, date, startTime, endTime) {
    // Check if the facility is already booked for the given date and time
    for (const booking of bookings) {
      if (
        booking.facility === facility &&
        booking.date === date &&
        !(endTime <= booking.startTime || startTime >= booking.endTime)
      ) {
        return false; // Facility is already booked
      }
    }
  
    return true; // Facility is available for booking
  }
  
  // Function to book a facility
  function bookFacility(facility, date, startTime, endTime) {
    // Check if the facility is available for booking
    if (isAvailable(facility, date, startTime, endTime)) {
      // Find the facility in the configuration
      const facilityConfig = facilities.find(f => f.name === facility);
  
      // Calculate the booking amount based on the facility rates
      let amount = 0;
      for (const rate of facilityConfig.rates) {
        const rateStartTime = new Date(`1970-01-01T${rate.start}:00`).getTime();
        const rateEndTime = new Date(`1970-01-01T${rate.end}:00`).getTime();
        const bookingStartTime = new Date(`1970-01-01T${startTime}:00`).getTime();
        const bookingEndTime = new Date(`1970-01-01T${endTime}:00`).getTime();
  
        if (
          bookingStartTime <= rateEndTime &&
          bookingEndTime >= rateStartTime
        ) {
          const start = Math.max(rateStartTime, bookingStartTime);
          const end = Math.min(rateEndTime, bookingEndTime);
          const duration = (end - start) / (1000 * 60 * 60); // Convert duration to hours
          amount += rate.rate * duration;
        }
      }
  
      // Create a new booking object
      const newBooking = new Booking(facility, date, startTime, endTime, amount);
  
      // Add the booking to the bookings array
      bookings.push(newBooking);
  
      return `Booked, Rs. ${amount}`;
    } else {
      return 'Booking Failed, Already Booked';
    }
  }
  
  // Example usage
  console.log(bookFacility('Clubhouse', '26-10-2020', '16:00', '22:00')); // Booked, Rs. 3000
  console.log(bookFacility('Tennis Court', '26-10-2020', '16:00', '20:00')); // Booked, Rs. 200
  console.log(bookFacility('Clubhouse', '26-10-2020', '16:00', '22:00')); // Booking Failed, Already Booked
  console.log(bookFacility('Tennis Court', '26-10-2020', '17:00', '21:00')); // Booking Failed, Already Booked
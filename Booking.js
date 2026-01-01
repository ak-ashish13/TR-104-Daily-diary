import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['flight', 'train', 'hotel', 'bus']
  },
  userEmail: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'confirmed',
    enum: ['confirmed', 'cancelled', 'completed']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  departureDate: {
    type: Date
  },
  arrivalDate: {
    type: Date
  },
  checkin: {
    type: Date
  },
  checkout: {
    type: Date
  },
  // Flight specific fields
  flightData: {
    flightID: String,
    source: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    duration: Number,
    airline: String,
    ticketPrice: Number
  },
  passengerDetails: [{
    title: String,
    firstName: String,
    lastName: String,
    gender: String,
    age: Number
  }],
  // Train specific fields
  trainData: {
    trainNumber: String,
    trainName: String,
    source: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    travelDuration: String
  },
  coach: String,
  travellers: [{
    name: String,
    age: Number,
    gender: String
  }],
  // Hotel specific fields
  hotelData: {
    name: String,
    location: String,
    roomtype: String
  },
  guestDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  rooms: Number,
  guests: Number,
  // Bus specific fields
  busData: {
    busOperator: String,
    busType: String,
    source: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    duration: String
  },
  seatNumbers: String,
  // API response from original booking
  apiResponse: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ userEmail: 1, type: 1 });
bookingSchema.index({ bookingDate: -1 });

export default mongoose.model('Booking', bookingSchema);

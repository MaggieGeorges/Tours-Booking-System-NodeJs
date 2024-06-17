import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelper';

const dbHelper = new DbHelper();

export interface CustomRequest extends Request {
    user: {
        isAdmin: boolean; 
    };
}

// Create a booking
export const createBooking = async (req: CustomRequest, res: Response) => {
    try {
        const { tourId, hotelId, bookingDate } = req.body;
        const id = uuidv4();
        const result = await dbHelper.exec('CreateBooking', { Id: id, TourId: tourId, HotelId: hotelId, BookingDate: bookingDate });

        return res.status(201).json({ Message: "Booking created successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req: CustomRequest, res: Response) => {
    try {
        const result = await dbHelper.exec('GetAllBookings', {});
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific booking by ID (User who made it or Admin)
export const getBookingById = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('GetBookingById', { id: req.params.id });
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a booking (User who made it or Admin)
export const updateBooking = async (req: CustomRequest, res: Response) => {
    try {
        const id = req.params.id;
        const { tourId, hotelId, bookingDate } = req.body;
        const result = await dbHelper.exec('UpdateBooking', { id, TourId: tourId, HotelId: hotelId, BookingDate: bookingDate });

        return res.status(200).json({ Message: "Booking updated successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cancel a booking (User who made it or Admin)
export const cancelBooking = async (req: CustomRequest, res: Response) => {
    try {
        const id = req.params.id;
        const result = await dbHelper.exec('CancelBooking', { id });

        return res.status(200).json({ Message: "Booking cancelled successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

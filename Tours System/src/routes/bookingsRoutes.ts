import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, cancelBooking, CustomRequest } from '../controllers/bookingsController';
import { verifyToken } from '../middlewares/verifyToken';

const bookingsRouter = express.Router();

bookingsRouter.post('/bookings', verifyToken, (req: CustomRequest, res) => createBooking(req, res));
bookingsRouter.get('/bookings', verifyToken, (req: CustomRequest, res) => getAllBookings(req, res));
bookingsRouter.get('/bookings/:id', verifyToken, (req: CustomRequest, res) => getBookingById(req, res));
bookingsRouter.put('/bookings/:id', verifyToken, (req: CustomRequest, res) => updateBooking(req, res));
bookingsRouter.delete('/bookings/:id', verifyToken, (req: CustomRequest, res) => cancelBooking(req, res));

export default bookingsRouter;

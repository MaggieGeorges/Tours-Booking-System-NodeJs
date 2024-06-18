import express from 'express';
import {
  CreateBooking,
  GetAllBookings,
  getBookingById,
  UpdateBooking,
  CancelBooking,
} from '../controllers/bookingsController';
import { verifyToken } from '../middlewares/verifyToken';

const bookingRouter = express.Router();

bookingRouter.post('/', verifyToken,  CreateBooking);
bookingRouter.get('/', verifyToken, GetAllBookings);
bookingRouter.get('/:id', verifyToken, getBookingById);
bookingRouter.put('/:id', verifyToken, UpdateBooking);
bookingRouter.delete('/:id', verifyToken, CancelBooking);

export default bookingRouter;

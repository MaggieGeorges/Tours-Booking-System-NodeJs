import express from 'express';
import { addHotel, getHotels, getHotelById, updateHotel, deleteHotel, CustomRequest } from '../controllers/hotelsController';
import { verifyToken } from '../middlewares/verifyToken';


const hotelsRouter= express.Router();

hotelsRouter.post('/add', verifyToken, (req, res)=> addHotel(req as CustomRequest, res));
hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:id', getHotelById);
hotelsRouter.put('/:id', verifyToken, (req, res) => updateHotel(req as CustomRequest, res));
hotelsRouter.delete('/:id', verifyToken, (req, res) => deleteHotel(req as CustomRequest, res));

export default hotelsRouter;

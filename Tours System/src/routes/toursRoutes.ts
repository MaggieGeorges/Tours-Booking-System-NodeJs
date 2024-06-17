import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { addTour, getTours, getTourById, updateTour, deleteTour, CustomRequest } from '../controllers/toursController'; // Add CustomRequest import

const toursRouter = express.Router();

toursRouter.post('/add', verifyToken, (req, res) => addTour(req as CustomRequest, res));
toursRouter.get('/', (req, res) => getTours(req as CustomRequest, res));
toursRouter.get('/:id', (req, res) => getTourById);
toursRouter.put('/:id', verifyToken, (req, res) => updateTour(req as CustomRequest, res));
toursRouter.delete('/:id', verifyToken, (req, res) => deleteTour(req as CustomRequest, res));

export default toursRouter;

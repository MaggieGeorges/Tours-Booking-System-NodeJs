import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelper';

const dbHelper = new DbHelper();

export interface CustomRequest extends Request {
    user: {
        isAdmin: boolean; 
    };
}


//Admins only are to add hotels
export const addHotel = async (req: Request, res: Response) => {
    try {
        const { name, location,  StarRating } = req.body;
        const id = uuidv4();
        const result = await dbHelper.exec('AddHotel', { Id: id, Name: name, Location: location, StarRating: StarRating });

        return res.status(201).json({ Message: "Hotel added successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all hotelss by both Admin and non-Admins
export const getHotels = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.query('SELECT * FROM Hotels');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific hotel by ID (Admin or non-Admin)
export const getHotelById = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('GetHotelById', { id: req.params.id });
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Update a hotel Admin only
export const updateHotel = async (req: CustomRequest, res: Response) => {
    try {
        const result = await dbHelper.exec('UpdateHotel', { id: req.params.id, ...req.body });
        return res.status(201).json({ Message: "Hotel updated successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Only an admin can delete a hotel
export const deleteHotel = async (req: CustomRequest, res: Response) => {
    try {
        const result = await dbHelper.exec('DeleteHotel', { id: req.params.id });
        return res.status(201).json({ Message: "Hotel deleted successfully!!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

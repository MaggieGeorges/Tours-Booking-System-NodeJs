import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelper';

const dbHelper = new DbHelper();

export interface CustomRequest extends Request {
    user: {
        isAdmin: boolean; 
    };
}

// Admins only can add tours
export const addTour = async (req: CustomRequest, res: Response) => {
    try {
        const { name, destination, description, price } = req.body;
        const id = uuidv4();
        const result = await dbHelper.exec('addTour', { Id: id, Name: name, Destination: destination, Description: description, Price: price });
        
        return res.status(201).json({ Message: "Tour added successfully!!" });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Getting all tours by both Admin and non-Admins
export const getTours = async (req: Request, res: Response) => {
    try {
        const tours = (await dbHelper.exec('getTours', {})).recordset;
        return res.status(200).json(tours);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Getting a specific tour by ID (Admin or non-Admin)
export const getTourById = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('getTourById', { id: req.params.id });
        res.status(200).json(result.recordset);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Updating a tour by Admin only
export const updateTour = async (req: CustomRequest, res: Response) => {
    try {
        const id = uuidv4();
        const { name, destination, description, price } = req.body;

        const results = await dbHelper.exec('updateTour', { Id: id, Name: name, Destination: destination, Description: description, Price: price });

        return res.status(200).json({ message: "Tour updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Only an admin can delete a tour
export const deleteTour = async (req: CustomRequest, res: Response) => {
    try {
        const id = uuidv4();

        const result = await dbHelper.exec('deleteTour', { Id: id });

        return res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

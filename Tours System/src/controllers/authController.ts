import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { RegisterSchema } from '../Helpers';
import bcrypt from 'bcrypt';
import { PayLoad, User } from '../models/authModel';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { ExtendedRequest1 } from '../middlewares/verifyToken';
import { DbHelper } from '../DatabaseHelper';


dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbHelper = new DbHelper();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const id = uid();
        const { Name, Email, Password } = req.body;
        const { error } = RegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const HashPassword = await bcrypt.hash(Password, 10);
        await dbHelper.exec('addUser', { Id: id, Name, Email, Password: HashPassword });

        return res.status(201).json({ Message: "User Was Added Successfully!!" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const userResult = await dbHelper.exec('getUserByEmail', { Email });
        const user = userResult.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Retrieved user:', user);

        if (!user.password) {
            console.log('Retrieved user has no password field: ', user);
            return res.status(500).json({ message: 'User has no password field' });
        }

        console.log('User password:', user.password); // Ensure 'password' is the correct field name from your DB

        const isMatch = await bcrypt.compare(Password, user.password); // Use user.password

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { Sub: user.id, Name: user.name, isAdmin: user.isAdmin },
            process.env.SECRET as string,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error); // Log detailed error
        const err = error as Error; // Type assertion
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

export const welcomePage = (req: ExtendedRequest1, res: Response) => {
    try {
        res.status(200).send(`<h1> Welcome ${req.info?.Name} </h1>`);
    } catch (error) {
        res.status(500).json(error);
    }
};

// New Functions

// Get All Users (Admin Only)
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = (await dbHelper.exec('getAllUsers', {})).recordset as User[];
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get a Specific User by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const requesterId = (req as ExtendedRequest1).info?.Sub || 'defaultId';

        const user = (await dbHelper.exec('getUserById', { Id: id, RequesterId: requesterId })).recordset as User[];
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found or unauthorized access" });
        }
        return res.status(200).json(user[0]);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update User Information
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const requesterId = (req as ExtendedRequest1).info?.Sub || 'defaultId';
        const { Name, Email, Password, isAdmin, isDeleted, isEmailSent } = req.body;

        const HashPassword = await bcrypt.hash(Password, 10);
        await dbHelper.exec('updateUser', { Id: id, RequesterId: requesterId, Name, Email, Password: HashPassword, isAdmin: isAdmin || false, isDeleted: isDeleted || false, isEmailSent: isEmailSent || false });

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a User (Admin Only)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const requesterId = (req as ExtendedRequest1).info?.Sub || 'defaultId';

        await dbHelper.exec('deleteUser', { Id: id, RequesterId: requesterId });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

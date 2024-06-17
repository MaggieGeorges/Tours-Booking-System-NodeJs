// Define the structure of a User
export interface User {
    Id: string;          
    Name: string;        
    Email: string;       
    Password: string;    
    isAdmin: number;     
    isDeleted: number;   
    isEmailSent: number; 
    createdAt: Date;     
    updatedAt: Date;    
}


export interface PayLoad {
    Sub: string;         
    Name: string;       
    isAdmin: boolean;    
}

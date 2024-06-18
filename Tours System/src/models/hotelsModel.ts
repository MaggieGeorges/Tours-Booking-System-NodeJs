// Defining the structure of a Hotel
export interface Hotel {
    Id: string;
    Name: string;
    Location: string;
    Description: string;
    Price: number;
    Rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface HotelsModel {
    Hotel: Hotel;
}

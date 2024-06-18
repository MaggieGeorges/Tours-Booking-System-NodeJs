// the structure of a Booking
export interface Booking {
    Id: string;
    UserId: string;
    ToursId: string;
    HotelsId: string;
    BookingDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingsModel {
    Booking: Booking;
}

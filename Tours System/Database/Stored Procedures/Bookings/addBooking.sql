USE Tours;
GO

CREATE PROCEDURE CreateBooking
    @Id INT,
    @ToursId VARCHAR(36),
    @HotelsId UNIQUEIDENTIFIER,
    @BookingDate DATE
AS
BEGIN
    INSERT INTO Bookings (Id, ToursId, HotelsId, BookingDate)
    VALUES (@Id, @ToursId, @HotelsId, @BookingDate);
END;
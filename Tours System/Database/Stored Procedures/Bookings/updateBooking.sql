USE Tours;
GO

CREATE PROCEDURE UpdateBooking
    @Id INT,
    @ToursId VARCHAR(36),
    @HotelsId UNIQUEIDENTIFIER,
    @BookingDate DATE
AS
BEGIN
    UPDATE Bookings
    SET ToursId = @ToursId, HotelsId = @HotelsId, BookingDate = @BookingDate
    WHERE Id = @Id;
END;
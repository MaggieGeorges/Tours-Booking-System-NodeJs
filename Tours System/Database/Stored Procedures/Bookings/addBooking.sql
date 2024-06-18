USE Tours;
GO

CREATE PROCEDURE addBooking
    @Id VARCHAR(36),
    @UserId  VARCHAR(36),
    @ToursId VARCHAR(36),
    @HotelsId UNIQUEIDENTIFIER,
    @BookingDate DATE
AS
BEGIN
    INSERT INTO Bookings (Id, UserId, ToursId, HotelsId, BookingDate)
    VALUES (@Id, @UserId, @ToursId, @HotelsId, @BookingDate);
END;



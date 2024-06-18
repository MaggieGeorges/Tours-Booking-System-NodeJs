USE Tours;
GO

CREATE PROCEDURE UpdateBooks
    @Id INT,
    @UserId  VARCHAR(36),
    @ToursId VARCHAR(36),
    @HotelsId UNIQUEIDENTIFIER,
    @BookingDate DATE
AS
BEGIN
    UPDATE Bookings
    SET UserId=@UserId, ToursId = @ToursId, HotelsId = @HotelsId, BookingDate = @BookingDate
    WHERE Id = @Id;
END;
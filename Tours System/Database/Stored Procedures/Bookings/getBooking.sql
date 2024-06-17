USE Tours;
GO

CREATE PROCEDURE GetBookingById
    @Id INT
AS
BEGIN
    SELECT * FROM Bookings WHERE Id = @Id;
END;
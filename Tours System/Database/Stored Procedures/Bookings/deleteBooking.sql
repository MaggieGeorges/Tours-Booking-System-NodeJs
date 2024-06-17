USE Tours;
GO

CREATE PROCEDURE CancelBooking
    @Id INT
AS
BEGIN
    DELETE FROM Bookings WHERE Id = @Id;
END;
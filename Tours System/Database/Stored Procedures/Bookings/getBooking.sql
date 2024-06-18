USE Tours;
GO

CREATE PROCEDURE getBookingById
    @Id INT 
AS
BEGIN
    SELECT * FROM Bookings WHERE Id = @Id;
END;
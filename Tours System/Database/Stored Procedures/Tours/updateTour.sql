USE Tours;
GO

CREATE OR ALTER PROCEDURE updateTour
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @destination NVARCHAR(255),
    @description NVARCHAR(MAX),
    @price DECIMAL(10, 2)
AS
BEGIN
    UPDATE Tours
    SET name = @name, destination = @destination, description = @description, price = @price
    WHERE id = @id;
        
END
   
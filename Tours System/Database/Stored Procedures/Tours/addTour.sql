USE Tours;
GO

CREATE OR ALTER PROCEDURE addTour
    @Id UNIQUEIDENTIFIER,
    @name NVARCHAR(255),
    @destination NVARCHAR(255),
    @description NVARCHAR(MAX),
    @price DECIMAL(10, 2)
AS
BEGIN
    
    INSERT INTO Tours (id, name, destination, description, price)
    VALUES (@Id, @name, @destination, @description, @price);
        
 END;


USE Tours;
GO

CREATE PROCEDURE addHotel
    @Id UNIQUEIDENTIFIER,
    @Name NVARCHAR(255),
    @Location NVARCHAR(255),
    @StarRating INT
AS
BEGIN
    INSERT INTO Hotels (ID, Name, Location, StarRating)
    VALUES (@Id, @Name, @Location, @StarRating);
END;

USE Tours;
GO

CREATE PROCEDURE updateHotel
    @Id UNIQUEIDENTIFIER,
    @Name NVARCHAR(255),
    @Location NVARCHAR(255),
    @StarRating INT
AS
BEGIN
    UPDATE Hotels
    SET Name = @Name, Location = @Location, StarRating = @StarRating
    WHERE ID = @Id;
END;

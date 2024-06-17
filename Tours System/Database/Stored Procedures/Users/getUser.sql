USE Tours;
GO

CREATE OR ALTER PROCEDURE getUserById (
    @Id VARCHAR(36),
    @RequesterId VARCHAR(36)
)
AS
BEGIN
    DECLARE @isAdmin INT;
    SELECT @isAdmin = isAdmin FROM Users WHERE id = @RequesterId;
    
    IF @isAdmin = 1 OR @Id = @RequesterId
    BEGIN
        SELECT * FROM Users WHERE id = @Id AND isDeleted = 0;
    END
    ELSE
    BEGIN
        SELECT 'Unauthorized access' AS Message;
    END
END;
GO
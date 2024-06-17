USE Tours;
GO

CREATE OR ALTER PROCEDURE deleteUser (
    @Id VARCHAR(36),
    @RequesterId VARCHAR(36)
)
AS
BEGIN
    DECLARE @RequesterIsAdmin INT;
    SELECT @RequesterIsAdmin = isAdmin FROM Users WHERE id = @RequesterId;
    
    IF @RequesterIsAdmin = 1
    BEGIN
        UPDATE Users
        SET isDeleted = 1, updatedAt = GETDATE()
        WHERE id = @Id;
    END
    ELSE
    BEGIN
        SELECT 'Unauthorized access' AS Message;
    END
END;
GO
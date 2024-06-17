USE Tours;
GO

CREATE OR ALTER PROCEDURE updateUser (
    @Id VARCHAR(36),
    @RequesterId VARCHAR(36),
    @Name NVARCHAR(255),
    @Email NVARCHAR(255),
    @Password NVARCHAR(255),
    @isAdmin INT,
    @isDeleted INT,
    @isEmailSent INT
)
AS
BEGIN
    DECLARE @RequesterIsAdmin INT;
    SELECT @RequesterIsAdmin = isAdmin FROM Users WHERE id = @RequesterId;
    
    IF @RequesterIsAdmin = 1 OR @Id = @RequesterId
    BEGIN
        UPDATE Users
        SET name = @Name, email = @Email, password = @Password, isAdmin = @isAdmin, isDeleted = @isDeleted, isEmailSent = @isEmailSent, updatedAt = GETDATE()
        WHERE id = @Id;
    END
    ELSE
    BEGIN
        SELECT 'Unauthorized access' AS Message;
    END
END;
GO
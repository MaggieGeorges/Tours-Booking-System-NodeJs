USE Tours;
GO

CREATE OR ALTER PROCEDURE addUser (
    @Id VARCHAR(36),
    @Name NVARCHAR(255),
    @Email NVARCHAR(255),
    @Password NVARCHAR(255),
    @isAdmin INT = 0,
    @isDeleted INT = 0,
    @isEmailSent INT = 0
)
AS
BEGIN
    INSERT INTO Users (id, name, email, password, isAdmin, isDeleted, isEmailSent)
    VALUES (@Id, @Name, @Email, @Password, @isAdmin, @isDeleted, @isEmailSent)
END;
GO


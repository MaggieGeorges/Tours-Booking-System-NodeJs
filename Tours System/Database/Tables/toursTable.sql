USE Tours;
GO

CREATE TABLE Tours (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    destination NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL
);


SELECT * FROM Tours;


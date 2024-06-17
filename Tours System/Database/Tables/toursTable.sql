USE Tours;
GO

CREATE TABLE Tours (
    id VARCHAR(36) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    destination NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL
);

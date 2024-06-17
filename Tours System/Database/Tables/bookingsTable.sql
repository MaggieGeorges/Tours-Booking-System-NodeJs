USE Tours;
GO

CREATE TABLE Bookings (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId VARCHAR(36) NOT NULL,
    ToursId VARCHAR(36),
    HotelsId UNIQUEIDENTIFIER,
    BookingDate DATE NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(id),
    FOREIGN KEY (ToursId) REFERENCES Tours(id),
    FOREIGN KEY (HotelsId) REFERENCES Hotels(id)
);

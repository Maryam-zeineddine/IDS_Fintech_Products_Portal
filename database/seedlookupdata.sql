USE IDSFintechPortal;
GO

-- Roles
INSERT INTO Roles (Name) VALUES ('Admin'), ('Employee');

-- Product statuses
INSERT INTO ProductStatus (Status) VALUES ('Active'), ('Maintenance'), ('Planned'), ('Deprecated');

-- Module statuses
INSERT INTO ModuleStatus (Status) VALUES ('Active'), ('Inactive'), ('In Development');

-- Client statuses
INSERT INTO ClientStatus (Status) VALUES ('Active'), ('Inactive'), ('Prospect');

-- Deployment statuses
INSERT INTO DeploymentStatus (Status) VALUES ('Live'), ('In Review'), ('Blocked'), ('Planned');

SELECT * FROM Roles;
SELECT * FROM ProductStatus;
SELECT * FROM ModuleStatus;
SELECT * FROM ClientStatus;
SELECT * FROM DeploymentStatus;
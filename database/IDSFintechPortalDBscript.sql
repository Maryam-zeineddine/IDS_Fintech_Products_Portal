-- 1. LOOKUP TABLES (no dependencies)

CREATE TABLE Roles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ProductStatus (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ModuleStatus (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ClientStatus (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE DeploymentStatus (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(50) NOT NULL UNIQUE
);

-- 2. CORE ENTITY TABLES (depend only on lookup tables)

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    RoleId INT NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES Roles(Id)
);

CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Description NVARCHAR(1000) NULL,
    BusinessPurpose NVARCHAR(1000) NULL,
    ProductStatusId INT NOT NULL,
    CurrentVersion NVARCHAR(50) NULL,
    SupportedMarkets NVARCHAR(255) NULL,
    Criticality NVARCHAR(50) NULL,
    Technologies NVARCHAR(500) NULL,
    Notes NVARCHAR(1000) NULL,
    CONSTRAINT FK_Products_ProductStatus FOREIGN KEY (ProductStatusId) REFERENCES ProductStatus(Id)
);

CREATE TABLE Clients (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CompanyName NVARCHAR(150) NOT NULL,
    Country NVARCHAR(100) NULL,
    ContactInfo NVARCHAR(255) NULL,
    ClientStatusId INT NOT NULL,
    Notes NVARCHAR(1000) NULL,
    CONSTRAINT FK_Clients_ClientStatus FOREIGN KEY (ClientStatusId) REFERENCES ClientStatus(Id)
);

CREATE TABLE TeamMembers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Department NVARCHAR(100) NULL,
    JobTitle NVARCHAR(100) NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    IsActive BIT NOT NULL DEFAULT 1
);

-- 3. TABLES DEPENDENT ON PRODUCTS

CREATE TABLE Modules (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    Name NVARCHAR(150) NOT NULL,
    Description NVARCHAR(1000) NULL,
    ModuleStatusId INT NOT NULL,
    CONSTRAINT FK_Modules_Products FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT FK_Modules_ModuleStatus FOREIGN KEY (ModuleStatusId) REFERENCES ModuleStatus(Id)
);

CREATE TABLE Repositories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    RepoName NVARCHAR(150) NOT NULL,
    GithubUrl NVARCHAR(500) NOT NULL,
    MainBranch NVARCHAR(100) NULL,
    Description NVARCHAR(500) NULL,
    CONSTRAINT FK_Repositories_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
);

CREATE TABLE Documents (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DocumentName NVARCHAR(150) NOT NULL,
    DocumentType NVARCHAR(100) NULL,
    ProductId INT NOT NULL,
    Description NVARCHAR(500) NULL,
    FileReference NVARCHAR(500) NULL,
    LastUpdatedDate DATE NULL,
    CONSTRAINT FK_Documents_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
);

CREATE TABLE ProductResponsibilities (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    TeamMemberId INT NOT NULL,
    Responsibility NVARCHAR(150) NOT NULL,
    Description NVARCHAR(500) NULL,
    CONSTRAINT FK_ProductResp_Products FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT FK_ProductResp_TeamMembers FOREIGN KEY (TeamMemberId) REFERENCES TeamMembers(Id)
);

-- 4. DEPLOYMENTS (depends on Products + Clients + DeploymentStatus)

CREATE TABLE Deployments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    ClientId INT NOT NULL,
    ProductVersion NVARCHAR(50) NULL,
    GoLiveDate DATE NULL,
    DeploymentStatusId INT NOT NULL,
    SupportTier NVARCHAR(100) NULL,
    ClientSpecificNotes NVARCHAR(1000) NULL,
    CONSTRAINT FK_Deployments_Products FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT FK_Deployments_Clients FOREIGN KEY (ClientId) REFERENCES Clients(Id),
    CONSTRAINT FK_Deployments_DeploymentStatus FOREIGN KEY (DeploymentStatusId) REFERENCES DeploymentStatus(Id)
);

-- 5. TABLES DEPENDENT ON DEPLOYMENTS

CREATE TABLE DeploymentModules (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DeploymentId INT NOT NULL,
    ModuleId INT NOT NULL,
    CONSTRAINT FK_DeploymentModules_Deployments FOREIGN KEY (DeploymentId) REFERENCES Deployments(Id),
    CONSTRAINT FK_DeploymentModules_Modules FOREIGN KEY (ModuleId) REFERENCES Modules(Id),
    CONSTRAINT UQ_DeploymentModules UNIQUE (DeploymentId, ModuleId)
);

CREATE TABLE Environments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DeploymentId INT NOT NULL,
    EnvironmentName NVARCHAR(150) NOT NULL,
    EnvironmentType NVARCHAR(50) NOT NULL, -- e.g. Development, Testing, UAT, Production
    Purpose NVARCHAR(500) NULL,
    ServerName NVARCHAR(150) NULL,
    OperatingSystem NVARCHAR(100) NULL,
    ApplicationUrl NVARCHAR(500) NULL,
    DatabaseInfo NVARCHAR(500) NULL,
    MonitoringLink NVARCHAR(500) NULL,
    AccessInstructions NVARCHAR(1000) NULL,
    Notes NVARCHAR(1000) NULL,
    CONSTRAINT FK_Environments_Deployments FOREIGN KEY (DeploymentId) REFERENCES Deployments(Id)
);
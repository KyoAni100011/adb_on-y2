CREATE DATABASE CourseManagement;
GO

USE CourseManagement;
GO

-- User Table
CREATE TABLE [User] (
    [UserId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [UserName] NVARCHAR(100),
    [Password] CHAR(60),
    [PhoneNumber] NVARCHAR(15),
    [Email] VARCHAR(100),
    [Street] NVARCHAR(100),
    [Ward] NVARCHAR(100),
    [District] NVARCHAR(100),
    [City] NVARCHAR(100),
    [DateOfBirth] DATETIME2,
    [Gender] VARCHAR(10) CHECK (Gender IN ('F', 'M')),
    [Role] NVARCHAR(50) CHECK ([Role] IN ('Student', 'Lecturer', 'Admin')),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([UserId])
);
GO

-- Lecture Table
CREATE TABLE [Lecture] (
    [LectureId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [Degrees] NVARCHAR(100),
    [CurrentWorkplaceStreet] NVARCHAR(100),
    [CurrentWorkplaceWard] NVARCHAR(100),
    [CurrentWorkplaceDistrict] NVARCHAR(100),
    [CurrentWorkplaceCity] NVARCHAR(100),
    [Biography] NVARCHAR(MAX),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([LectureId])
);
GO

-- Admin Table
CREATE TABLE [Admin] (
    [AdminId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([AdminId])
);
GO

-- Student Table
CREATE TABLE [Student] (
    [StudentId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([StudentId])
);
GO

-- Role Table
CREATE TABLE [Role] (
    [RoleId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [RoleName] NVARCHAR(50),
    [Description] NVARCHAR(255),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([RoleId])
);
GO

-- UserRoles Table
CREATE TABLE [UserRoles] (
    [UserRoleID] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [UserID] UNIQUEIDENTIFIER,
    [RoleID] UNIQUEIDENTIFIER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([UserRoleID])
);
GO

-- Permissions Table
CREATE TABLE [Permissions] (
    [PermissionID] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [PermissionName] NVARCHAR(50),
    [Description] NVARCHAR(255),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([PermissionID])
);
GO

-- RolePermissions Table
CREATE TABLE [RolePermissions] (
    [RolePermissionID] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [RoleID] UNIQUEIDENTIFIER,
    [PermissionID] UNIQUEIDENTIFIER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([RolePermissionID])
);
GO

-- Course Table
CREATE TABLE [Course] (
    [CourseId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [Title] NVARCHAR(255),
    [LectureId] UNIQUEIDENTIFIER NOT NULL,
    [Description] NVARCHAR(2000),
    [Language] NVARCHAR(50),
    [TotalReviews] INTEGER,
    [Level] NVARCHAR(50) CHECK (Level IN ('Beginner', 'Immediate', 'Advanced', 'All levels')),
    [Price] BIGINT,
    [CourseImageName] NVARCHAR(255),
    [CourseImageURL] NVARCHAR(255),
    [CourseVideoName] NVARCHAR(255),
    [CourseVideoURL] NVARCHAR(255),
    [Subtitle] NVARCHAR(255),
    [Status] NVARCHAR(50) CHECK (Status IN ('Active', 'Inactive', 'Pending', 'Blocked')),
    [Rating] FLOAT,
    [NumberStudentsRegister] SMALLINT,
    [CategoryId] UNIQUEIDENTIFIER NOT NULL,
    [DiscountId] UNIQUEIDENTIFIER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([CourseId])
);
GO

-- Review Table
CREATE TABLE [Review] (
    [ReviewId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Review] NVARCHAR(MAX),
    [Rating] FLOAT CHECK (Rating >= 1 AND Rating <= 5),
    [TimeReview] DATETIME,
    PRIMARY KEY ([ReviewId])
);
GO

-- SeniorLecturer Table
CREATE TABLE [SeniorLecturer] (
    [LectureId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [RegistrationDate] DATETIME,
    [SharePercentage] INTEGER,
    PRIMARY KEY ([LectureId], [CourseId])
)

-- Category Table
CREATE TABLE [Category] (
    [CategoryId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [SubcategoryId] UNIQUEIDENTIFIER,
    [Description] NVARCHAR(255),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([CategoryId])
);
GO

-- CourseEnrollments Table
CREATE TABLE [CourseEnrollments] (
    [EnrollmentId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    [StudentId] UNIQUEIDENTIFIER NOT NULL,
    [EnrollmentDate] DATE,
    [Status] NVARCHAR(50) CHECK (Status IN ('Completed','Uncompleted')),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([CourseId], [StudentId])
);
GO

-- Cart Table
CREATE TABLE [Cart] (
    [CartId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [UserId] UNIQUEIDENTIFIER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([CartId])
);
GO

-- CartItem Table
CREATE TABLE [CartItem] (
    [CartId] UNIQUEIDENTIFIER NOT NULL,
    [CourseId] UNIQUEIDENTIFIER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([CartId], [CourseId])
);
GO

-- Discount Table
CREATE TABLE [Discount] (
    [DiscountId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [DiscountPercent] TINYINT,
    [Code] NVARCHAR(20),
    [ExpireDate] DATETIME2,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([DiscountId])
);
GO

-- Order Table
CREATE TABLE [Order] (
    [OrderID] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [OrderAt] DATETIME,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [PaymentId] UNIQUEIDENTIFIER NULL,
    [DiscountId] UNIQUEIDENTIFIER NULL,
    [Amount] INTEGER,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([OrderID])
);
GO

-- OrderItem Table
CREATE TABLE [OrderItem] (
    [OrderItemId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [OrderId] UNIQUEIDENTIFIER NOT NULL,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    [Quantity] INT,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([OrderId], [CourseId])
);
GO

-- Payment Table
CREATE TABLE [Payment] (
    [PaymentId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [PaymentMethod] NVARCHAR(50),
    [PaymentDate] DATETIME,
    [UserId] UNIQUEIDENTIFIER,
    [Amount] INT, -- Changed to INT
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([PaymentId])
);
GO

-- DiscussionForums Table
CREATE TABLE [DiscussionForums] (
    [ForumId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER,
    [Title] NVARCHAR(255),
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([ForumId])
);
GO

-- ForumPosts Table
CREATE TABLE [ForumPosts] (
    [PostId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [ForumId] UNIQUEIDENTIFIER,
    [UserId] UNIQUEIDENTIFIER,
    [Content] NVARCHAR(2000),
    [ImageName] NVARCHAR(60),
    [ImageURL] NVARCHAR(100),
    PRIMARY KEY([PostId])
);
GO

-- Transactions Table
CREATE TABLE [Transactions] (
    [id] INTEGER NOT NULL IDENTITY PRIMARY KEY,
    [CourseId] UNIQUEIDENTIFIER,
    [LectureId] UNIQUEIDENTIFIER,
    [CustomerId] UNIQUEIDENTIFIER,
    [Tax] FLOAT,
    [TaxPercentage] TINYINT,
    [TransactionFee] FLOAT,
    [TransactionFeePercentage] TINYINT,
    [NetAmount] FLOAT,
    [Revenue] FLOAT,
    [RevenuePercentage] TINYINT,
    [Channel] NVARCHAR(50),
    [ChannelPercentage] TINYINT,
    [CouponId] UNIQUEIDENTIFIER,
    [Platform] NVARCHAR(50),
    [PlatformPercentage] TINYINT,
    [TransactionDate] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE [Assignments] (
    [AssignmentId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER,
    [Title] NVARCHAR(255),
    [Description] NVARCHAR(2000),
    [ImageName] NVARCHAR(100),
    [ImageURL] NVARCHAR(100),
    [VideoName] NVARCHAR(100),
    [VideoURL] NVARCHAR(100),
    [Text] NVARCHAR(MAX),
    [SubmissionDeadline] DATETIME,
	[CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([AssignmentId])
);
GO

CREATE TABLE [Lesson] (
    [LessonId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CourseId] UNIQUEIDENTIFIER,
    [Title] NVARCHAR(255),
    [Description] NVARCHAR(2000),
    [ImageName] NVARCHAR(100),
    [ImageURL] NVARCHAR(100),
    [VideoName] NVARCHAR(100),
    [VideoURL] NVARCHAR(100),
    [StartTime] DATETIME,
    [EndTime] DATETIME,
	[CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([LessonId])
)

CREATE TABLE [RevenueReports] (
    [ReportId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [LectureId] UNIQUEIDENTIFIER,
    [ReportMonth] DATETIME,
    [TotalEarning] BIGINT,
    [WithholdingTax] BIGINT,
    [NetEarnings] BIGINT,
    [ExpectedPaymentDate] DATE,
	[CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([ReportId])
);
GO

CREATE TABLE [LessonsProgress](
    [EnrollmentId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [LessonId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [Completed] BIT,
    [CompletionDate] DATETIME,
    [VewedResources] NVARCHAR(MAX),
    [WatchedVideos] NVARCHAR(MAX),
    [TimeSpentMinutes] INTEGER,
    PRIMARY KEY ([EnrollmentId], [LessonId])
)

CREATE TABLE [Submission] (
    [SubmissionId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [AssignmentId] UNIQUEIDENTIFIER,
    [StudentId] UNIQUEIDENTIFIER,
    [Score] BIGINT,
	[Feedback] NVARCHAR(2000),
    [Status] NVARCHAR(50) CHECK (Status IN ('Active', 'Inactive', 'Pending', 'Blocked')),
	[CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY([AssignmentId],[StudentId])
);
GO

CREATE TABLE [Notifications](
    [Id] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [SenderId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [Message] NVARCHAR (MAX),
    [SendAt] DATETIME,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ([Id]),
);
GO

CREATE TABLE [NotificationRecipients](
    [NotificationId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [UserId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [CreatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ([NotificationId], [UserId])
);
GO

CREATE TABLE [Message](
    [SenderId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [MessageId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [DateTime] DATETIME,
    [Content] NVARCHAR(MAX),
    [ImageName] NVARCHAR(60),
    [ImageURL] NVARCHAR(100)
    PRIMARY KEY ([MessageId])
);
GO

CREATE TABLE [PrivateChat](
    [SenderId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [MessageId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [ReceiverId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [DateTime] DATETIME,
    [Content] NVARCHAR(MAX),
    [ImageName] NVARCHAR(255),
    [ImageURL] NVARCHAR(255)
    PRIMARY KEY ([MessageId], [SenderId], [ReceiverId])
);
GO

CREATE TABLE [PublicChat](
    [SenderId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [MessageId] UNIQUEIDENTIFIER NOT NULL UNIQUE,
    [DateTime] DATETIME,
    [Content] NVARCHAR(MAX),
    [ImageName] NVARCHAR(255),
    [ImageURL] NVARCHAR(255)
    PRIMARY KEY ([MessageId])
);
GO

-- Add foreign key constraints to the Lecturer table
ALTER TABLE [Lecture]
ADD CONSTRAINT FK_Lecturer_LecturerId
    FOREIGN KEY ([LectureId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the Student table
ALTER TABLE [Student]
ADD CONSTRAINT FK_Student_StudentId
    FOREIGN KEY ([StudentId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the Admin table
ALTER TABLE [Admin]
ADD CONSTRAINT FK_Admin_AdminId
    FOREIGN KEY ([AdminId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the UserRoles table
ALTER TABLE [UserRoles]
ADD CONSTRAINT FK_UserRoles_UserID
    FOREIGN KEY ([UserID]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [UserRoles]
ADD CONSTRAINT FK_UserRoles_RoleID
    FOREIGN KEY ([RoleID]) REFERENCES [Role]([RoleId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the RolePermissions table
ALTER TABLE [RolePermissions]
ADD CONSTRAINT FK_RolePermissions_RoleID
    FOREIGN KEY ([RoleID]) REFERENCES [Role]([RoleId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [RolePermissions]
ADD CONSTRAINT FK_RolePermissions_PermissionID
    FOREIGN KEY ([PermissionID]) REFERENCES [Permissions]([PermissionID])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the Category table
ALTER TABLE [Category]
ADD CONSTRAINT FK_Category_SubcategoryId
    FOREIGN KEY ([SubcategoryId]) REFERENCES [Category]([CategoryId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the Course table
ALTER TABLE [Course]
ADD CONSTRAINT FK_Courses_DiscountId
    FOREIGN KEY ([DiscountId]) REFERENCES [Discount]([DiscountId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Course]
ADD CONSTRAINT FK_Courses_CategoryId
    FOREIGN KEY ([CategoryId]) REFERENCES [Category]([CategoryId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Course]
ADD CONSTRAINT FK_Courses_LectureId
    FOREIGN KEY ([LectureId]) REFERENCES [Lecture]([LectureId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the CourseEnrollments table
ALTER TABLE [CourseEnrollments]
ADD CONSTRAINT FK_CourseEnrollments_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [CourseEnrollments]
ADD CONSTRAINT FK_CourseEnrollments_StudentId
    FOREIGN KEY ([StudentId]) REFERENCES [Student]([StudentId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the CartItem table
ALTER TABLE [CartItem]
ADD CONSTRAINT FK_CartItem_CartId
    FOREIGN KEY ([CartId]) REFERENCES [Cart]([CartId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [CartItem]
ADD CONSTRAINT FK_CartItem_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the Order table
ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_UserId
    FOREIGN KEY ([UserId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_DiscountId
    FOREIGN KEY ([DiscountId]) REFERENCES [Discount]([DiscountId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_PaymentId
    FOREIGN KEY ([PaymentId]) REFERENCES [Payment]([PaymentId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the OrderItem table
ALTER TABLE [OrderItem]
ADD CONSTRAINT FK_OrderItem_OrderId
    FOREIGN KEY ([OrderId]) REFERENCES [Order]([OrderID])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [OrderItem]
ADD CONSTRAINT FK_OrderItem_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the Payment table
ALTER TABLE [Payment]
ADD CONSTRAINT FK_Payment_UserId
    FOREIGN KEY ([UserId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the DiscussionForums table
ALTER TABLE [DiscussionForums]
ADD CONSTRAINT FK_DiscussionForums_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the ForumPosts table
ALTER TABLE [ForumPosts]
ADD CONSTRAINT FK_ForumPosts_ForumId
    FOREIGN KEY ([ForumId]) REFERENCES [DiscussionForums]([ForumId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [ForumPosts]
ADD CONSTRAINT FK_ForumPosts_UserId
    FOREIGN KEY ([UserId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the Transactions table
ALTER TABLE [Transactions]
ADD CONSTRAINT FK_Transactions_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Transactions]
ADD CONSTRAINT FK_Transactions_LectureId
    FOREIGN KEY ([LectureId]) REFERENCES [Lecture]([LectureId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Transactions]
ADD CONSTRAINT FK_Transactions_CustomerId
    FOREIGN KEY ([CustomerId]) REFERENCES [User]([UserId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the Assignments table
ALTER TABLE [Assignments]
ADD CONSTRAINT FK_Assignments_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraints to the Submission table
ALTER TABLE [Submission]
ADD CONSTRAINT FK_Submission_AssignmentId
    FOREIGN KEY ([AssignmentId]) REFERENCES [Assignments]([AssignmentId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

ALTER TABLE [Submission]
ADD CONSTRAINT FK_Submission_StudentId
    FOREIGN KEY ([StudentId]) REFERENCES [Student]([StudentId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the RevenueReports table
ALTER TABLE [RevenueReports]
ADD CONSTRAINT FK_RevenueReports_LectureId
    FOREIGN KEY ([LectureId]) REFERENCES [Lecture]([LectureId])
    ON UPDATE NO ACTION ON DELETE NO ACTION;
GO

-- Add foreign key constraint to the Notifications table
ALTER TABLE [Notifications]
ADD CONSTRAINT FK_Notifications_Sender
    FOREIGN KEY ([SenderId]) REFERENCES [User]([UserId]);
GO

-- Add foreign key constraints to the NotificationRecipients table
ALTER TABLE [NotificationRecipients]
ADD CONSTRAINT FK_NotificationRecipients_Notifications
    FOREIGN KEY ([UserId]) REFERENCES [User]([UserId]);
GO

ALTER TABLE [NotificationRecipients]
ADD CONSTRAINT FK_NotificationRecipients_Receiver
    FOREIGN KEY ([NotificationId]) REFERENCES [Notifications]([Id]);
GO

-- Add foreign key constraint to the Message table
ALTER TABLE [Message]
ADD CONSTRAINT FK_Message_Sender
    FOREIGN KEY ([SenderId]) REFERENCES [User]([UserId]);
GO

-- Add foreign key constraints to the PrivateChat table
ALTER TABLE [PrivateChat]
ADD CONSTRAINT FK_PrivateChat_Sender
    FOREIGN KEY ([SenderId]) REFERENCES [User]([UserId]);
GO

ALTER TABLE [PrivateChat]
ADD CONSTRAINT FK_PrivateChat_Receiver
    FOREIGN KEY ([ReceiverId]) REFERENCES [User]([UserId]);
GO

-- Add foreign key constraint to the PublicChat table
ALTER TABLE [PublicChat]
ADD CONSTRAINT FK_PublicChat_Sender
    FOREIGN KEY ([SenderId]) REFERENCES [User]([UserId]);
GO

-- Add foreign key constraints to the Review table
ALTER TABLE [Review]
ADD CONSTRAINT FK_Review_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId]);
GO

ALTER TABLE [Review]
ADD CONSTRAINT FK_Review_UserId
    FOREIGN KEY ([UserId]) REFERENCES [User]([UserId]);
GO

-- Add foreign key constraints to the SeniorLecturer table

ALTER TABLE [SeniorLecturer]
ADD CONSTRAINT FK_SeniorLecturer_CourseId
    FOREIGN KEY ([CourseId]) REFERENCES [Course]([CourseId]);
GO


ALTER TABLE [SeniorLecturer]
ADD CONSTRAINT FK_SeniorLecturer_LecturerId
    FOREIGN KEY ([LectureId]) REFERENCES [Lecture]([LectureId]);
GO

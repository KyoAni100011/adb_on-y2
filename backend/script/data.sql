-- Insert into Role
INSERT INTO [Role] (RoleId, RoleName, Description)
VALUES 
    (NEWID(), N'Admin', N'Administrator with full permissions'),
    (NEWID(), N'Lecturer', N'Instructor with permissions to manage courses'),
    (NEWID(), N'Student', N'Student with permissions to enroll in courses');
GO

-- Insert users
INSERT INTO [User] (
    [UserId], [UserName], [Password], [PhoneNumber], [Email], 
    [Street], [Ward], [District], [City], [DateOfBirth], [Gender], [Role]
) VALUES
    (NEWID(), 'John Doe', 'hashed_password1', '123-456-7890', 'john.doe@example.com', 
     '123 Elm St', 'Central Ward', 'Springfield District', 'Springfield City', '1985-06-15', 'M', 'Student'),
     
    (NEWID(), 'Jane Smith', 'hashed_password2', '123-456-7891', 'jane.smith@example.com', 
     '456 Oak St', 'East Ward', 'Springfield District', 'Springfield City', '1990-02-20', 'F', 'Lecturer'),

    (NEWID(), 'Jane Simon', 'hashed_password5', '823-986-7891', 'jane.simon@example.com', 
     '422 Oak St', 'East Ward', 'Springfield District', 'Springfield City', '1990-02-20', 'M', 'Lecturer'),
     
    (NEWID(), 'Alice Johnson', 'hashed_password3', '123-456-7892', 'alice.johnson@example.com', 
     '789 Pine St', 'West Ward', 'Springfield District', 'Springfield City', '1988-11-11', 'F', 'Admin'),
     
    (NEWID(), 'Bob Brown', 'hashed_password4', '123-456-7893', 'bob.brown@example.com', 
     '101 Maple St', 'North Ward', 'Springfield District', 'Springfield City', '1992-03-25', 'M', 'Student');
GO


-- Insert lectures
DECLARE @LectureId1 UNIQUEIDENTIFIER;
DECLARE @LectureId2 UNIQUEIDENTIFIER;
SET @LectureId1 = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Jane Smith');
SET @LectureId2 = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Jane Simon');

INSERT INTO [Lecture] (
    [LectureId], [Degrees], [CurrentWorkplaceStreet], [CurrentWorkplaceWard], 
    [CurrentWorkplaceDistrict], [CurrentWorkplaceCity], [Biography]
) VALUES
    (@LectureId1, 'PhD in Computer Science', '202 University Ave', 'Central Ward', 'Springfield District', 'Springfield City','Dr. Jane Smith is a renowned expert in the field of computer science, with over 20 years of experience in academia and industry. She has authored several books and research papers on artificial intelligence, machine learning, and data science. Jane has taught at various prestigious universities around the world, where she has inspired countless students to pursue careers in technology. Her current research focuses on the ethical implications of AI and the development of intelligent systems that can interact with humans in natural ways. In addition to her academic work, Jane is a sought-after speaker at international conferences and a consultant to several Fortune 500 companies. Her passion for teaching and her deep knowledge of the subject make her a favorite among students.'),
    (@LectureId2, 'Master of Science in Education', '123 College Blvd', 'East Ward', 'Springfield District', 'Springfield City', 'Jane Simon is an experienced educator with a strong background in curriculum development and instructional design. With a Master of Science in Education, she has worked in various educational settings, ranging from primary schools to higher education institutions. Jane specializes in creating engaging and effective learning experiences that cater to diverse student needs. She has a deep understanding of modern pedagogical techniques and integrates technology into her teaching to enhance learning outcomes. Jane is also actively involved in teacher training programs, where she mentors new educators and helps them develop their teaching skills. Her work has been recognized by several educational bodies, and she continues to contribute to the field through her research on innovative teaching methods.');
GO


-- Insert admin
DECLARE @AdminId UNIQUEIDENTIFIER;
SET @AdminId = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Alice Johnson');
INSERT INTO [Admin] (
    [AdminId]
) VALUES
    (@AdminId);
GO

-- Insert students
DECLARE @StudentId1 UNIQUEIDENTIFIER, @StudentId2 UNIQUEIDENTIFIER;

-- Get UserId for John Doe and Bob Brown
SET @StudentId1 = (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe');
SET @StudentId2 = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown');

INSERT INTO [Student] (
    [StudentId]
) VALUES
    (@StudentId1),
    (@StudentId2);
GO

-- Get Role IDs
DECLARE @StudentRoleId UNIQUEIDENTIFIER = (SELECT [RoleId] FROM [Role] WHERE [RoleName] = 'Student');
DECLARE @LecturerRoleId UNIQUEIDENTIFIER = (SELECT [RoleId] FROM [Role] WHERE [RoleName] = 'Lecturer');
DECLARE @AdminRoleId UNIQUEIDENTIFIER = (SELECT [RoleId] FROM [Role] WHERE [RoleName] = 'Admin');


-- Get User IDs
DECLARE @JohnDoeId UNIQUEIDENTIFIER = (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe');
DECLARE @JaneSmithId UNIQUEIDENTIFIER = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Jane Smith');
DECLARE @AliceJohnsonId UNIQUEIDENTIFIER = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Alice Johnson');
DECLARE @BobBrownId UNIQUEIDENTIFIER = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown');
DECLARE @JaneSimonId UNIQUEIDENTIFIER = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Jane Simon');

-- Insert user roles
INSERT INTO [UserRoles] (
    [UserRoleID], [UserID], [RoleID]
) VALUES
    (NEWID(), @JohnDoeId, @StudentRoleId),
    (NEWID(), @JaneSmithId, @LecturerRoleId),
    (NEWID(), @JaneSimonId, @LecturerRoleId),
    (NEWID(), @AliceJohnsonId, @AdminRoleId),
    (NEWID(), @BobBrownId, @StudentRoleId);
GO

-- Insert main categories
INSERT INTO [Category] (
    [CategoryId], [SubcategoryId], [Description]
) VALUES
    (NEWID(), NULL, 'Programming Languages and Software Development'),
    (NEWID(), NULL, 'Mathematics and Statistics'),
    (NEWID(), NULL, 'Data Science and Machine Learning'),
    (NEWID(), NULL, 'Physics and Engineering'),
    (NEWID(), NULL, 'Business and Management'),
    (NEWID(), NULL, 'Design and Creativity'),
    (NEWID(), NULL, 'Health and Wellness'),
    (NEWID(), NULL, 'Social Sciences'),
    (NEWID(), NULL, 'Arts and Humanities'),
    (NEWID(), NULL, 'Finance and Investment');
GO

-- Insert subcategories
INSERT INTO [Category] (
    [CategoryId], [SubcategoryId], [Description]
) VALUES
    -- Subcategories for Programming Languages and Software Development
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Programming Languages and Software Development'), 'Python Programming'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Programming Languages and Software Development'), 'JavaScript Programming'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Programming Languages and Software Development'), 'Web Development'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Programming Languages and Software Development'), 'Java Programming'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Programming Languages and Software Development'), 'C# Programming'),
    
    -- Subcategories for Mathematics and Statistics
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Mathematics and Statistics'), 'Calculus'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Mathematics and Statistics'), 'Algebra'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Mathematics and Statistics'), 'Probability Theory'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Mathematics and Statistics'), 'Statistics'),
    
    -- Subcategories for Data Science and Machine Learning
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Data Science and Machine Learning'), 'Data Analysis'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Data Science and Machine Learning'), 'Machine Learning Algorithms'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Data Science and Machine Learning'), 'Deep Learning'),
    
    -- Subcategories for Physics and Engineering
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Physics and Engineering'), 'Quantum Mechanics'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Physics and Engineering'), 'Thermodynamics'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Physics and Engineering'), 'Electromagnetism'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Physics and Engineering'), 'Structural Engineering'),
    
    -- Subcategories for Business and Management
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Business and Management'), 'Project Management'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Business and Management'), 'Entrepreneurship'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Business and Management'), 'Marketing'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Business and Management'), 'Financial Management'),
    
    -- Subcategories for Design and Creativity
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Design and Creativity'), 'Graphic Design'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Design and Creativity'), 'UX/UI Design'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Design and Creativity'), 'Creative Writing'),
    (NEWID(), (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Design and Creativity'), 'Art and Illustration');
GO


-- Insert courses with specific lecturers
INSERT INTO [Course] ([CourseId], [Title], [LectureId], [Description], [Language], [Price], [CourseImageName], [CourseImageURL], [CourseVideoName], [CourseVideoURL], [Subtitle], [Status], [Rating], [NumberStudentsRegister], [CategoryId], [DiscountId], [CreatedAt], [UpdatedAt], [Level], [TotalReviews]) 
VALUES 
(NEWID(), 'Introduction to Python Programming', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'Learn the basics of Python programming including syntax, functions, and libraries.', 'English', 45000, 
    'python_intro.jpg', 'http://example.com/images/python_intro.jpg', 'python_intro.mp4', 'http://example.com/videos/python_intro.mp4', 
    'Python Programming Basics', 'Active', 4.7, 120, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Python Programming'), NULL, GETDATE(), GETDATE(), 'Beginner', 8),
(NEWID(), 'Advanced JavaScript', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'Dive deep into JavaScript with advanced topics like asynchronous programming and frameworks.', 'English', 47000, 
    'javascript_advanced.jpg', 'http://example.com/images/javascript_advanced.jpg', 'javascript_advanced.mp4', 'http://example.com/videos/javascript_advanced.mp4', 
    'Advanced JavaScript Techniques', 'Blocked', 4.8, 140, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'JavaScript Programming'), NULL, GETDATE(), GETDATE(), 'Advanced', 6),
(NEWID(), 'Machine Learning Basics', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'An introductory course on machine learning concepts, algorithms, and practical applications.', 'English', 50000, 
    'machine_learning_basics.jpg', 'http://example.com/images/machine_learning_basics.jpg', 'machine_learning_basics.mp4', 'http://example.com/videos/machine_learning_basics.mp4', 
    'Introduction to Machine Learning', 'Pending', 4.9, 100, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Machine Learning Algorithms'), NULL, GETDATE(), GETDATE(), 'Beginner', 1),
(NEWID(), 'Fundamentals of Graphic Design', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'Explore the core principles of graphic design, including typography, color theory, and layout.', 'English', 48000, 
    'graphic_design_fundamentals.jpg', 'http://example.com/images/graphic_design_fundamentals.jpg', 'graphic_design_fundamentals.mp4', 'http://example.com/videos/graphic_design_fundamentals.mp4', 
    'Graphic Design Basics', 'Active', 4.6, 80, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Graphic Design'), NULL, GETDATE(), GETDATE(), 'All levels', 2),
(NEWID(), 'Introduction to Data Science', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'Learn fundamental concepts in data science, including data exploration, analysis, and visualization.', 'English', 55000, 
    'data_science_intro.jpg', 'http://example.com/images/data_science_intro.jpg', 'data_science_intro.mp4', 'http://example.com/videos/data_science_intro.mp4', 
    'Data Science Basics', 'Active', 4.8, 110, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Data Science and Machine Learning'), NULL, GETDATE(), GETDATE(), 'Immediate', 55),
(NEWID(), 'Web Development Bootcamp', 
    (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] IN ('Jane Smith', 'Jane Simon') ORDER BY NEWID()), 
    'An intensive bootcamp covering HTML, CSS, JavaScript, and modern web development frameworks.', 'English', 60000, 
    'web_dev_bootcamp.jpg', 'http://example.com/images/web_dev_bootcamp.jpg', 'web_dev_bootcamp.mp4', 'http://example.com/videos/web_dev_bootcamp.mp4', 
    'Complete Web Development', 'Active', 4.9, 160, 
    (SELECT [CategoryId] FROM [Category] WHERE [Description] = 'Web Development'), NULL, GETDATE(), GETDATE(), 'All levels', 10);
GO


-- Insert reviews into the Review table
INSERT INTO [Review] ([ReviewId], [CourseId], [UserId], [Review], [Rating], [TimeReview])
VALUES
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Python Programming'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe'), 'Great course for beginners. Very well explained!', 5, GETDATE()),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Python Programming'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown'), 'The content is good, but it needs more practical examples.', 3.5, GETDATE()),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Advanced JavaScript'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown'), 'Excellent course for advanced learners. Covers all important topics in detail.', 4.8, GETDATE()),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Advanced JavaScript'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe'), 'Detailed explanations and useful examples. Highly recommended!', 4.9, GETDATE());

-- Insert data into the CourseEnrollments table
INSERT INTO [CourseEnrollments] ([EnrollmentId], [CourseId], [StudentId], [EnrollmentDate], [Status])
VALUES
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Python Programming'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe'), '2024-08-01', 'Completed'),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Python Programming'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown'), '2024-08-02', 'Uncompleted'),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Advanced JavaScript'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown'), '2024-08-03', 'Completed'),
(NEWID(), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Advanced JavaScript'), (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe'), '2024-08-04', 'Uncompleted');

-- Insert carts for two students
INSERT INTO [Cart] ([CartId], [UserId], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] = 'Bob Brown'), GETDATE(), GETDATE()),
(NEWID(), (SELECT TOP 1 [UserId] FROM [User] WHERE [UserName] = 'John Doe'), GETDATE(), GETDATE());
GO

-- Insert cart items for the carts
INSERT INTO [CartItem] ([CartId], [CourseId], [CreatedAt], [UpdatedAt])
VALUES
-- Items for the first student's cart
((SELECT TOP 1 [CartId] FROM [Cart] WHERE [UserId] = (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe')), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Machine Learning Basics'), GETDATE(), GETDATE()),
((SELECT TOP 1 [CartId] FROM [Cart] WHERE [UserId] = (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe')), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Web Development Bootcamp'), GETDATE(), GETDATE()),
((SELECT TOP 1 [CartId] FROM [Cart] WHERE [UserId] = (SELECT [UserId] FROM [User] WHERE [UserName] = 'John Doe')), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Data Science'), GETDATE(), GETDATE()),

-- Items for the second student's cart
((SELECT TOP 1 [CartId] FROM [Cart] WHERE [UserId] = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown')), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Fundamentals of Graphic Design'), GETDATE(), GETDATE()),
((SELECT TOP 1 [CartId] FROM [Cart] WHERE [UserId] = (SELECT [UserId] FROM [User] WHERE [UserName] = 'Bob Brown')), (SELECT [CourseId] FROM [Course] WHERE [Title] = 'Introduction to Data Science'), GETDATE(), GETDATE());
GO

-- Insert data into Discount table
INSERT INTO [Discount] ([DiscountId], [DiscountPercent], [Code], [ExpireDate], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), 10, 'SAVE10', DATEADD(MONTH, 1, GETDATE()), GETDATE(), GETDATE()),
(NEWID(), 15, 'SAVE15', DATEADD(MONTH, 2, GETDATE()), GETDATE(), GETDATE()),
(NEWID(), 20, 'SAVE20', DATEADD(MONTH, 3, GETDATE()), GETDATE(), GETDATE()),
(NEWID(), 25, 'SAVE25', DATEADD(MONTH, 4, GETDATE()), GETDATE(), GETDATE()),
(NEWID(), 30, 'SAVE30', DATEADD(MONTH, 5, GETDATE()), GETDATE(), GETDATE());
GO



CREATE PROCEDURE [RegisterStudent]
    @UserName NVARCHAR(100),
    @Password CHAR(60),
    @PhoneNumber NVARCHAR(15),
    @Email VARCHAR(100),
    @Street NVARCHAR(100),
    @Ward NVARCHAR(100),
    @District NVARCHAR(100),
    @City NVARCHAR(100),
    @DateOfBirth DATETIME2,
    @Gender VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Kiểm tra người dùng đã tồn tại hay chưa
        IF EXISTS (SELECT 1 FROM [User] WHERE [Email] = @Email)
        BEGIN
            THROW 50000, 'User already exists', 1;
        END;

        -- Tạo ID cho người dùng và giỏ hàng
        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();
        DECLARE @CartId UNIQUEIDENTIFIER = NEWID();

        -- Thêm người dùng mới vào bảng [User]
        INSERT INTO [User] (
            [UserId], [UserName], [Password], [PhoneNumber], [Email], 
            [Street], [Ward], [District], [City], [DateOfBirth], 
            [Gender], [Role], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @UserName, @Password, @PhoneNumber, @Email, 
            @Street, @Ward, @District, @City, @DateOfBirth, 
            @Gender, 'Student', SYSDATETIME(), SYSDATETIME()
        );

        -- Thêm bản ghi mới vào bảng [Student]
        INSERT INTO [Student] (
            [StudentId], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, SYSDATETIME(), SYSDATETIME()
        );

        -- Thêm bản ghi mới vào bảng [Cart]
        INSERT INTO [Cart] (
            [CartId], [UserId], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @CartId, @UserId, SYSDATETIME(), SYSDATETIME()
        );

        -- Commit giao dịch nếu không có lỗi xảy ra
        COMMIT TRANSACTION;

        -- Trả về kết quả thành công
        SELECT 
            'User registered successfully' AS Message,
            (
                SELECT 
                    [UserId],
                    [UserName],
                    (SELECT [CartId]
                     FROM [Cart]
                     WHERE [UserId] = @UserId
                     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS Cart
                FROM [User]
                WHERE [UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS [User];

    END TRY
    BEGIN CATCH
        -- Bắt lỗi và rollback giao dịch
        ROLLBACK TRANSACTION;

        -- Trả về thông tin lỗi
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred during registration' AS Message,
            @ErrorMessage AS ErrorDetail;

        -- Đảm bảo lỗi được báo cáo rõ ràng
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE [RegisterLecturer]
    @UserName NVARCHAR(100),
    @Password CHAR(60),
    @PhoneNumber NVARCHAR(15),
    @Email VARCHAR(100),
    @Street NVARCHAR(100),
    @Ward NVARCHAR(100),
    @District NVARCHAR(100),
    @City NVARCHAR(100),
    @DateOfBirth DATETIME2,
    @Gender VARCHAR(10),
    @Degrees NVARCHAR(100),
    @CurrentWorkplaceStreet NVARCHAR(100),
    @CurrentWorkplaceWard NVARCHAR(100),
    @CurrentWorkplaceDistrict NVARCHAR(100),
    @CurrentWorkplaceCity NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if user already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE [Email] = @Email)
        BEGIN
            SELECT 'User already exists' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();

        -- Insert new user
        INSERT INTO [User] (
            [UserId], [UserName], [Password], [PhoneNumber], [Email], 
            [Street], [Ward], [District], [City], [DateOfBirth], 
            [Gender], [Role], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @UserName, @Password, @PhoneNumber, @Email, 
            @Street, @Ward, @District, @City, @DateOfBirth, 
            @Gender, 'Lecturer', DEFAULT, DEFAULT
        );

        -- Insert new lecturer record
        INSERT INTO [Lecture] (
            [LectureId], [Degrees], [CurrentWorkplaceStreet], 
            [CurrentWorkplaceWard], [CurrentWorkplaceDistrict], 
            [CurrentWorkplaceCity], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @Degrees, @CurrentWorkplaceStreet, 
            @CurrentWorkplaceWard, @CurrentWorkplaceDistrict, 
            @CurrentWorkplaceCity, DEFAULT, DEFAULT
        );

        COMMIT TRANSACTION;

        SELECT 
            'Lecturer registered successfully' AS Message,
                (
                SELECT 
                    [UserId],
                    [UserName],
                FROM [User]
                WHERE [UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS [User];
        FROM [User]
        WHERE [UserId] = @UserId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during registration' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [GetLecturerById]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra xem UserId có tồn tại hay không
        DECLARE @Exists INT;
        SET @Exists = (
            SELECT COUNT(1) 
            FROM [User] 
            WHERE [UserId] = @UserId
        );

        IF @Exists = 0
        BEGIN
            SELECT 'User not found' AS Message;
            RETURN;
        END;

        -- Truy vấn thông tin giảng viên
        SELECT 
            'Lecturer found' AS Message,
            (
                SELECT 
                    u.[UserId],
                    u.[UserName],
                    u.[PhoneNumber],
                    u.[Email],
                    u.[Street],
                    u.[Ward],
                    u.[District],
                    u.[City],
                    u.[DateOfBirth],
                    u.[Gender],
                    l.[Degrees],
                    l.[CurrentWorkplaceStreet],
                    l.[CurrentWorkplaceWard],
                    l.[CurrentWorkplaceDistrict],
                    l.[CurrentWorkplaceCity],
                    l.[Biography],
                    u.[CreatedAt],
                    u.[UpdatedAt]
                FROM 
                    [User] u
                JOIN 
                    [Lecture] l 
                ON 
                    u.[UserId] = l.[LectureId]
                WHERE 
                    u.[UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS LecturerProfile;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'An error occurred while retrieving lecturer information' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE AddCourse
    @Title NVARCHAR(255),
    @LectureId UNIQUEIDENTIFIER,
    @Description NVARCHAR(2000),
    @Level NVARCHAR(50),
    @Language NVARCHAR(50),
    @Price BIGINT,
    @CourseImageName NVARCHAR(255),
    @CourseImageURL NVARCHAR(255),
    @CourseVideoName NVARCHAR(255),
    @CourseVideoURL NVARCHAR(255),
    @Subtitle NVARCHAR(255),
    @Status NVARCHAR(50) = 'Inactive', -- Default value is 'Inactive'
    @CategoryId UNIQUEIDENTIFIER,
    @DiscountId UNIQUEIDENTIFIER = NULL -- Optional parameter
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Generate a new unique identifier for the course
        DECLARE @CourseId UNIQUEIDENTIFIER = NEWID();

        -- Check if the course already exists
        IF EXISTS (SELECT 1 FROM [Course] WHERE [Title] = @Title AND [LectureId] = @LectureId)
        BEGIN
            SELECT 'Course with the same title and lecture already exists' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Insert a new course record
        INSERT INTO [Course] (
            [CourseId], [Title], [LectureId], [Description], [Language], 
            [TotalReviews], [Level], [Price], [CourseImageName], 
            [CourseImageURL], [CourseVideoName], [CourseVideoURL], 
            [Subtitle], [Status], [Rating], [NumberStudentsRegister], 
            [CategoryId], [DiscountId]
        ) VALUES (
            @CourseId, @Title, @LectureId, @Description, @Language, 0, @Level,
            @Price, @CourseImageName, 
            @CourseImageURL, @CourseVideoName, @CourseVideoURL, 
            @Subtitle, @Status, 0, 0, 
            @CategoryId, @DiscountId
        );

        COMMIT TRANSACTION;

        SELECT 
            'Course added successfully' AS Message,
            (
                SELECT 
                    [CourseId], [Title], [LectureId], [Description], [Language], 
                    [TotalReviews], [Level], [Price], [CourseImageName], 
                    [CourseImageURL], [CourseVideoName], [CourseVideoURL], 
                    [Subtitle], [Status], [Rating], [NumberStudentsRegister], 
                    [CategoryId], [DiscountId]
                FROM [Course]
                WHERE [CourseId] = @CourseId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS [Course]
        FROM [Course]
        WHERE [CourseId] = @CourseId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during course addition' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [LoginUser]
    @Email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DECLARE @UserId UNIQUEIDENTIFIER;
        DECLARE @StoredPassword CHAR(60); 

        -- Lấy thông tin UserId và Password
        SELECT 
            @UserId = [UserId],
            @StoredPassword = [Password]
        FROM [User]
        WHERE [Email] = @Email;

        IF @UserId IS NULL
        BEGIN
            SELECT 'Invalid user' AS Message;
            RETURN;
        END;

        -- Lấy thông tin người dùng, giỏ hàng và các khóa học trong giỏ hàng
        SELECT 
            'Login successful' AS Message,
            (
                SELECT 
                    [UserId],
                    [UserName],
                    [Password],
                    (
                        SELECT 
                            Cart.[CartId],
                            (
                                SELECT 
                                    c.[CourseId],
                                    c.[Title],
                                    c.[Description],
                                    c.[Price],
                                    c.[CourseImageURL],
                                    c.[CourseVideoURL]
                                FROM [CartItem] ci
                                INNER JOIN [Course] c ON ci.[CourseId] = c.[CourseId]
                                WHERE ci.[CartId] = Cart.[CartId]
                                FOR JSON PATH
                            ) AS CartItems
                        FROM [Cart] Cart
                        WHERE Cart.[UserId] = @UserId
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    ) AS Cart
                FROM [User]
                WHERE [UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS [User];
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'An error occurred during login' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [GetAllCourses]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            c.[CourseId],
            c.[Title],
            c.[LectureId],
            c.[Description],
            c.[Language],
            c.[Price],
            c.[CourseImageURL],
            c.[Subtitle],
            c.[Rating],
            c.[TotalReviews],
            c.[Level],
            u.[UserName] AS [LectureName],
            ca.[Description] AS [CategoryDescription],
            d.[DiscountPercent]
        FROM [Course] c
        JOIN [Lecture] l ON l.[LectureId] = c.[LectureId] 
        JOIN [User] u ON u.[UserId] = l.[LectureId] 
        JOIN [Category] ca ON ca.[CategoryId] = c.[CategoryId]
        LEFT JOIN [Discount] d ON d.[DiscountId] = c.[DiscountId]
        WHERE c.[Status] = 'Active';
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred during getting courses' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO


CREATE PROCEDURE [GetCourseById]
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check if the course exists
    IF NOT EXISTS (SELECT 1 FROM [Course] WHERE [CourseId] = @CourseId)
    BEGIN
        SELECT 'Course doesn''t exist' AS Message;
        RETURN;
    END;

    BEGIN TRY
        SELECT
            c.CourseId,
            c.Title AS CourseTitle,
            c.Description AS CourseDescription,
            c.Language,
            c.Price,
            c.CourseImageName,
            c.CourseImageURL,
            c.CourseVideoName,
            c.CourseVideoURL,
            c.Subtitle,
            c.Status AS CourseStatus,
            c.Rating AS CourseRating,
            c.NumberStudentsRegister,
            u.UserName AS LecturerName,
            l.LectureId AS LecturerId,
            l.Degrees,
            l.CurrentWorkplaceStreet,
            l.CurrentWorkplaceWard,
            l.CurrentWorkplaceDistrict,
            l.CurrentWorkplaceCity,
            l.Biography,
            (SELECT
                cat.Description AS Category,
                subcat.Description AS Subcategory
             FROM [Category] cat
             LEFT JOIN [Category] subcat ON cat.SubcategoryId = subcat.CategoryId
             WHERE cat.CategoryId = c.CategoryId
             FOR JSON PATH) AS Categories,
            (SELECT
                r.ReviewId,
                r.Review,
                r.Rating AS ReviewRating,
                r.TimeReview,
                u.UserName
             FROM [Review] r 
             JOIN [User] u ON u.UserId = r.UserId
             WHERE r.CourseId = @CourseId
             FOR JSON PATH) AS Reviews
        FROM [Course] c
        JOIN [Lecture] l ON c.LectureId = l.LectureId
        JOIN [User] u ON u.UserId = l.LectureId
        WHERE c.CourseId = @CourseId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred during getting course detail' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [EnrollCourse]
    @CourseId UNIQUEIDENTIFIER,
    @StudentId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem khóa học có tồn tại hay không
    IF NOT EXISTS (SELECT 1 FROM [Course] WHERE [CourseId] = @CourseId)
    BEGIN
        SELECT 'Course does not exist' AS Message;
        RETURN;
    END;

    -- Kiểm tra xem học sinh có tồn tại hay không
    IF NOT EXISTS (SELECT 1 FROM [Student] WHERE [StudentId] = @StudentId)
    BEGIN
        SELECT 'Student does not exist' AS Message;
        RETURN;
    END;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Kiểm tra xem học sinh đã đăng ký khóa học này chưa
        IF EXISTS (SELECT 1 FROM [CourseEnrollments] WHERE [CourseId] = @CourseId AND [StudentId] = @StudentId)
        BEGIN
            SELECT 'Student is already enrolled in this course' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Đăng ký học sinh vào khóa học
        INSERT INTO [CourseEnrollments] (
            [EnrollmentId],
            [CourseId], 
            [StudentId], 
            [EnrollmentDate], 
            [Status], 
            [CreatedAt], 
            [UpdatedAt]
        )
        VALUES (
            NEWID(),  -- Tạo GUID mới cho EnrollmentId
            @CourseId, 
            @StudentId, 
            GETDATE(),  -- Ngày đăng ký
            'Uncompleted',  -- Trạng thái ban đầu
            DEFAULT, 
            DEFAULT
        );

        COMMIT TRANSACTION;

        SELECT 'Student enrolled successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during enrollment' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [AddCartItem]
    @CartId UNIQUEIDENTIFIER,
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Check if the cart item already exists
        IF EXISTS (SELECT 1 FROM [CartItem] WHERE CartId = @CartId AND CourseId = @CourseId)
        BEGIN
            SELECT 'Item already exists in the cart' AS Message;
            RETURN;
        END;

        -- Insert the new cart item
        INSERT INTO [CartItem] (
            [CartId],
            [CourseId],
            [CreatedAt],
            [UpdatedAt]
        ) VALUES (
            @CartId,
            @CourseId,
            GETUTCDATE(),
            GETUTCDATE()  
        );

        SELECT 'Cart item added successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR(
            'Error occurred while adding cart item: %s',
            @ErrorSeverity,
            @ErrorState,
            @ErrorMessage
        );
    END CATCH
END;
GO

CREATE PROCEDURE [RemoveCartItem]
    @CartId UNIQUEIDENTIFIER,
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Start a transaction to ensure atomicity
        BEGIN TRANSACTION;

        -- Delete the cart item
        DELETE FROM [CartItem]
        WHERE CartId = @CartId AND CourseId = @CourseId;

        -- Check if there are any items left in the cart
        IF NOT EXISTS (SELECT 1 FROM [CartItem] WHERE CartId = @CartId)
        BEGIN
            -- Delete the cart if it's empty
            DELETE FROM [Cart]
            WHERE CartId = @CartId;
        END

        -- Commit the transaction if everything is successful
        COMMIT TRANSACTION;

        SELECT 'Cart item removed successfully' AS Message, 0 AS ErrorCode;
    END TRY
    BEGIN CATCH
        -- Rollback the transaction in case of an error
        IF XACT_STATE() <> 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        SELECT 
            'Error occurred while removing cart item' AS Message,
            @ErrorMessage AS ErrorDetail,
            @ErrorSeverity AS Severity,
            @ErrorState AS State,
            1 AS ErrorCode;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [CreateOrder]
    @UserId UNIQUEIDENTIFIER,
    @CartId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @NewOrderId UNIQUEIDENTIFIER;
        DECLARE @OrderAmount BIGINT; -- Changed to BIGINT to accommodate large sums

        -- Temporary table to hold course info from cart with lecturers
        DECLARE @CartCourses TABLE (
            CartId UNIQUEIDENTIFIER,
            CourseId UNIQUEIDENTIFIER,
            LectureId UNIQUEIDENTIFIER,
            Price BIGINT
        );

        -- Insert courses from cart into the temporary table
        INSERT INTO @CartCourses
        SELECT c.CartId, c.CourseId, co.LectureId, co.Price
        FROM CartItem c
        JOIN Course co ON c.CourseId = co.CourseId
        WHERE c.CartId = @CartId;

        -- Check if the cart has items
        IF NOT EXISTS (SELECT 1 FROM @CartCourses)
        BEGIN
            SELECT 'Cart is empty' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Group by LectureId and process each group
        DECLARE lecture_cursor CURSOR FOR
        SELECT DISTINCT LectureId FROM @CartCourses;

        OPEN lecture_cursor;

        DECLARE @LectureId UNIQUEIDENTIFIER;

        FETCH NEXT FROM lecture_cursor INTO @LectureId;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Calculate total amount for the current lecture group
            SELECT @OrderAmount = SUM(Price)
            FROM @CartCourses
            WHERE LectureId = @LectureId;

            -- Create a new Order
            SET @NewOrderId = NEWID();

            INSERT INTO [Order] (OrderID, OrderAt, UserId, Amount, CreatedAt, UpdatedAt)
            VALUES (@NewOrderId, GETDATE(), @UserId, @OrderAmount, GETDATE(), GETDATE());

            -- Insert corresponding Order Items
            INSERT INTO OrderItem (OrderItemId, OrderId, CourseId, Quantity, CreatedAt, UpdatedAt)
            SELECT NEWID(), @NewOrderId, CourseId, 1, GETDATE(), GETDATE()
            FROM @CartCourses
            WHERE LectureId = @LectureId;

            -- Move to the next lecture
            FETCH NEXT FROM lecture_cursor INTO @LectureId;
        END

        CLOSE lecture_cursor;
        DEALLOCATE lecture_cursor;

        -- Optionally clear the cart after the order is placed
        DELETE FROM CartItem
        WHERE CartId = @CartId;

        COMMIT TRANSACTION;

        SELECT 'Order created successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred while creating the order' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [GetListLessons]
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if the course has lessons
        IF NOT EXISTS (SELECT 1 FROM [Lesson] WHERE [CourseId] = @CourseId)
        BEGIN
            SELECT 'No lessons found for the specified course' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Retrieve lessons for the specified course
        SELECT 
            [LessonId],
            [CourseId],
            [Title],
            [Description],
            [ImageName],
            [ImageURL],
            [VideoName],
            [VideoURL],
            [StartTime],
            [EndTime],
            [CreatedAt],
            [UpdatedAt]
        FROM 
            [Lesson]
        WHERE 
            [CourseId] = @CourseId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred while retrieving the lessons' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetAllCategories
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT 
            [CategoryId],
            [Description]
        FROM [Category];
    END TRY
    BEGIN CATCH
        SELECT 
            'Error occurred while retrieving categories' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetCoursesByLectureId
    @LectureId UNIQUEIDENTIFIER
AS
BEGIN
    -- Xác định thời gian bắt đầu
    SET NOCOUNT ON;

    BEGIN TRY
        -- Truy vấn để lấy danh sách khóa học dựa trên LectureId
        SELECT
            CourseId,
            Title,
            Language,
            Level,
            Price, 
            Status,
            Rating,
            NumberStudentsRegister 
        FROM Course
        WHERE LectureId = @LectureId;
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        SELECT 
            'Error occurred while retrieving courses' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetCourseDetails
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Declare variables to store JSON results
        DECLARE @CourseDetails NVARCHAR(MAX);
        DECLARE @Lessons NVARCHAR(MAX);
        DECLARE @Assignments NVARCHAR(MAX);

        -- Get course details as JSON
        SELECT @CourseDetails = (
            SELECT 
                c.CourseId,
                c.Title,
                c.LectureId,
                c.Description,
                c.Language,
                c.Level,
                c.Price,
                c.CourseImageName,
                c.CourseImageURL,
                c.CourseVideoName,
                c.CourseVideoURL,
                c.Subtitle,
                c.Status,
                c.CategoryId
            FROM 
                [Course] c
            WHERE 
                c.CourseId = @CourseId
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        );

        -- Get lessons related to the course as JSON
        SET @Lessons = (
            SELECT 
                l.LessonId,
                l.Title AS LessonTitle,
                l.StartTime,
                l.EndTime
            FROM 
                [Lesson] l
            WHERE 
                l.CourseId = @CourseId
            FOR JSON PATH
        );

        -- Get assignments related to the course as JSON
        SET @Assignments = (
            SELECT 
                a.AssignmentId,
                a.Title AS AssignmentTitle,
                a.SubmissionDeadline
            FROM 
                [Assignments] a
            WHERE 
                a.CourseId = @CourseId
            FOR JSON PATH
        );

        -- Return the combined result as a single JSON object
        SELECT 
            @CourseDetails AS CourseDetails,
            @Lessons AS Lessons,
            @Assignments AS Assignments;
    END TRY
    BEGIN CATCH
        SELECT 
            'Error occurred while retrieving course details' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE CreateLesson
    @CourseId UNIQUEIDENTIFIER,
    @Title NVARCHAR(255),
    @Description NVARCHAR(2000),
    @ImageName NVARCHAR(100),
    @ImageURL NVARCHAR(100),
    @VideoName NVARCHAR(100),
    @VideoURL NVARCHAR(100),
    @StartTime DATETIME,
    @EndTime DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Insert a new lesson into the Lesson table with auto-generated LessonId
        INSERT INTO [Lesson] (
            [LessonId], 
            [CourseId], 
            [Title], 
            [Description], 
            [ImageName], 
            [ImageURL], 
            [VideoName], 
            [VideoURL], 
            [StartTime], 
            [EndTime],
            [CreatedAt],
            [UpdatedAt]
        ) 
        VALUES (
            NEWID(),  -- Automatically generate LessonId
            @CourseId, 
            @Title, 
            @Description, 
            @ImageName, 
            @ImageURL, 
            @VideoName, 
            @VideoURL, 
            @StartTime, 
            @EndTime,
            DEFAULT,  -- Use default value for CreatedAt
            DEFAULT   -- Use default value for UpdatedAt
        );
        
        -- Return success message
        SELECT 
            'Lesson created successfully' AS Message;
    END TRY
    BEGIN CATCH
        -- Return error message if there is an issue
        SELECT 
            'Error occurred while creating the lesson' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE CreateAssignment
    @CourseId UNIQUEIDENTIFIER,
    @Title NVARCHAR(255),
    @Description NVARCHAR(2000),
    @ImageName NVARCHAR(100),
    @ImageURL NVARCHAR(100),
    @VideoName NVARCHAR(100),
    @VideoURL NVARCHAR(100),
    @Text NVARCHAR(MAX),
    @SubmissionDeadline DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Insert a new assignment into the Assignments table with auto-generated AssignmentId
        INSERT INTO [Assignments] (
            [AssignmentId], 
            [CourseId], 
            [Title], 
            [Description], 
            [ImageName], 
            [ImageURL], 
            [VideoName], 
            [VideoURL], 
            [Text], 
            [SubmissionDeadline],
            [CreatedAt],
            [UpdatedAt]
        ) 
        VALUES (
            NEWID(),  -- Automatically generate AssignmentId
            @CourseId, 
            @Title, 
            @Description, 
            @ImageName, 
            @ImageURL, 
            @VideoName, 
            @VideoURL, 
            @Text, 
            @SubmissionDeadline,
            DEFAULT,  -- Use default value for CreatedAt
            DEFAULT   -- Use default value for UpdatedAt
        );
        
        -- Return success message
        SELECT 
            'Assignment created successfully' AS Message;
    END TRY
    BEGIN CATCH
        -- Return error message if there is an issue
        SELECT 
            'Error occurred while creating the assignment' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetAssignmentById
    @AssignmentId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Truy vấn thông tin assignment từ bảng Assignments
        SELECT 
            [AssignmentId],
            [CourseId],
            [Title],
            [Description],
            [ImageName],
            [ImageURL],
            [VideoName],
            [VideoURL],
            [Text],
            [SubmissionDeadline],
            [CreatedAt],
            [UpdatedAt]
        FROM 
            [Assignments]
        WHERE 
            [AssignmentId] = @AssignmentId;

        -- Trả về thông báo thành công
        SELECT 
            'Assignment retrieved successfully' AS Message;
    END TRY
    BEGIN CATCH
        -- Trả về thông báo lỗi nếu có vấn đề xảy ra
        SELECT 
            'Error occurred while retrieving the assignment' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetLessonById
    @LessonId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Truy vấn thông tin lesson từ bảng Lesson
        SELECT 
            [LessonId],
            [CourseId],
            [Title],
            [Description],
            [ImageName],
            [ImageURL],
            [VideoName],
            [VideoURL],
            [StartTime],
            [EndTime],
            [CreatedAt],
            [UpdatedAt]
        FROM 
            [Lesson]
        WHERE 
            [LessonId] = @LessonId;

        -- Trả về thông báo thành công
        SELECT 
            'Lesson retrieved successfully' AS Message;
    END TRY
    BEGIN CATCH
        -- Trả về thông báo lỗi nếu có vấn đề xảy ra
        SELECT 
            'Error occurred while retrieving the lesson' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetCartItems
    @UserId UNIQUEIDENTIFIER,
    @CartId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Truy vấn thông tin khóa học từ giỏ hàng
        SELECT 
            c.CourseId,
            c.Title,
            c.Description,
            c.Language,
            c.Level,
            c.Price,
            c.CourseImageName,
            c.CourseImageURL,
            c.CourseVideoName,
            c.CourseVideoURL,
            c.Subtitle,
            c.Status,
            c.Rating,
            c.NumberStudentsRegister
        FROM 
            CartItem ci
        JOIN 
            Course c ON ci.CourseId = c.CourseId
        JOIN 
            Cart ca ON ci.CartId = ca.CartId
        WHERE 
            ca.UserId = @UserId
            AND ci.CartId = @CartId;

        -- Trả về thông báo thành công
        SELECT 
            'Cart items retrieved successfully' AS Message;
    END TRY
    BEGIN CATCH
        -- Trả về thông báo lỗi nếu có vấn đề xảy ra
        SELECT 
            'Error occurred while retrieving cart items' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [ProcessPayment]
    @UserId UNIQUEIDENTIFIER,
    @PaymentMethod NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Kiểm tra nếu người dùng tồn tại
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE [UserId] = @UserId)
        BEGIN
            SELECT 'User not found' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Lấy OrderId và OrderAt của đơn hàng gần nhất của người dùng
        DECLARE @OrderId UNIQUEIDENTIFIER;
        DECLARE @OrderDate DATETIME;
        
        SELECT TOP 1 
            @OrderId = [OrderId], 
            @OrderDate = [OrderAt]
        FROM [Order]
        WHERE [UserId] = @UserId
        ORDER BY [OrderAt] DESC;

        -- Kiểm tra nếu đơn hàng tồn tại
        IF @OrderId IS NULL
        BEGIN
            SELECT 'No pending orders found for the specified user' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Tính tổng số tiền từ các mục trong đơn hàng, lấy giá từ bảng Course
        DECLARE @TotalAmount INT;

        SELECT 
            @TotalAmount = SUM(ci.[Price] * oi.[Quantity])
        FROM [OrderItem] oi
        JOIN [Course] ci ON oi.[CourseId] = ci.[CourseId]
        WHERE oi.[OrderId] = @OrderId;

        -- Kiểm tra nếu tổng số tiền hợp lệ
        IF @TotalAmount IS NULL OR @TotalAmount = 0
        BEGIN
            SELECT 'No items found in the order or total amount is zero' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Tạo một PaymentId mới
        DECLARE @PaymentId UNIQUEIDENTIFIER;
        SET @PaymentId = NEWID();

        -- Tạo PaymentDate tự động
        DECLARE @PaymentDate DATETIME;
        SET @PaymentDate = GETDATE();

        -- Chèn dữ liệu vào bảng Payment
        INSERT INTO [Payment] (
            [PaymentId], 
            [PaymentMethod], 
            [PaymentDate], 
            [UserId], 
            [Amount], 
            [CreatedAt], 
            [UpdatedAt]
        )
        VALUES (
            @PaymentId, 
            @PaymentMethod, 
            @PaymentDate, 
            @UserId, 
            @TotalAmount, 
            GETDATE(), 
            GETDATE()
        );

        -- Cập nhật trạng thái của đơn hàng và PaymentId
        UPDATE [Order]
        SET [PaymentId] = @PaymentId
        WHERE [OrderId] = @OrderId;

        -- Lấy CartId của người dùng từ bảng Cart
        DECLARE @CartId UNIQUEIDENTIFIER;
        
        SELECT 
            @CartId = [CartId]
        FROM [Cart]
        WHERE [UserId] = @UserId;

        -- Xóa các mục trong bảng CartItem dựa trên CartId
        IF @CartId IS NOT NULL
        BEGIN
            DELETE FROM [CartItem]
            WHERE [CartId] = @CartId;
        END

        -- Hoàn tất giao dịch
        COMMIT TRANSACTION;

        -- Trả về thông tin chi tiết dưới dạng JSON có tên cụ thể
        SELECT
            (
                SELECT 
                    @OrderId AS OrderId,
                    @PaymentMethod AS PaymentMethod,
                    @TotalAmount AS TotalAmount,
                    @OrderDate AS OrderDate,
                    @PaymentId AS PaymentId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS Payment;
        
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi và rollback giao dịch
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        -- Trả về thông tin lỗi dưới dạng JSON có tên cụ thể
        SELECT
            (
                SELECT 
                    'Error occurred during payment processing' AS Message,
                    @ErrorMessage AS ErrorDetail
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS Payment;
    END CATCH
END;
GO

CREATE PROCEDURE GetPurchasedCourses
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        
        -- Truy vấn thông tin khóa học đã được mua bởi sinh viên và trạng thái đăng ký
        SELECT 
            c.CourseId,
            c.Title,
            c.Description,
            c.Language,
            c.Level,
            c.Price,
            c.CourseImageName,
            c.CourseImageURL,
            c.CourseVideoName,
            c.CourseVideoURL,
            c.Subtitle,
            c.Status,
            c.Rating,
            c.NumberStudentsRegister,
            ISNULL(ce.Status, 'Not Enrolled') AS EnrollmentStatus,  -- Thêm trạng thái đăng ký của học sinh
            CASE
                WHEN ce.EnrollmentDate IS NOT NULL THEN CONVERT(VARCHAR, ce.EnrollmentDate, 120)
                ELSE 'N/A'
            END AS EnrollmentDate       -- Thêm ngày đăng ký của học sinh
        FROM 
            [Order] o
        JOIN 
            OrderItem oi ON o.OrderID = oi.OrderId
        JOIN 
            Course c ON oi.CourseId = c.CourseId
        LEFT JOIN 
            CourseEnrollments ce ON c.CourseId = ce.CourseId AND ce.StudentId = @UserId
        WHERE 
            o.UserId = @UserId;
    END TRY
    BEGIN CATCH
        -- Trả về thông báo lỗi nếu có vấn đề xảy ra
        SELECT 
            'Error occurred while retrieving purchased courses' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO


CREATE PROCEDURE GetCourseDetailsByStudentId
    @CourseId UNIQUEIDENTIFIER,
    @StudentId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Check if the student is enrolled in the course
        IF NOT EXISTS (
            SELECT 1
            FROM CourseEnrollments e
            WHERE e.CourseId = @CourseId AND e.StudentId = @StudentId
        )
        BEGIN
            -- If the student is not enrolled, return a message and exit
            SELECT 
                'Student is not enrolled in this course' AS Message;
            RETURN;
        END

        -- Declare variables to store JSON results
        DECLARE @CourseDetails NVARCHAR(MAX);
        DECLARE @Lessons NVARCHAR(MAX);
        DECLARE @Assignments NVARCHAR(MAX);

        -- Get course details as JSON
        SELECT @CourseDetails = (
            SELECT 
                c.CourseId,
                c.Title,
                c.LectureId,
                c.Description,
                c.Language,
                c.Level,
                c.Price,
                c.CourseImageName,
                c.CourseImageURL,
                c.CourseVideoName,
                c.CourseVideoURL,
                c.Subtitle,
                c.Status,
                c.CategoryId
            FROM 
                [Course] c
            WHERE 
                c.CourseId = @CourseId
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        );

        -- Get lessons related to the course as JSON
        SET @Lessons = (
            SELECT 
                l.LessonId,
                l.Title AS LessonTitle,
                l.StartTime,
                l.EndTime
            FROM 
                [Lesson] l
            WHERE 
                l.CourseId = @CourseId
            FOR JSON PATH
        );

        -- Get assignments related to the course as JSON
        SET @Assignments = (
            SELECT 
                a.AssignmentId,
                a.Title AS AssignmentTitle,
                a.SubmissionDeadline
            FROM 
                [Assignments] a
            WHERE 
                a.CourseId = @CourseId
            FOR JSON PATH
        );

        -- Return the combined result as a single JSON object
        SELECT 
            @CourseDetails AS CourseDetails,
            @Lessons AS Lessons,
            @Assignments AS Assignments;
    END TRY
    BEGIN CATCH
        SELECT 
            'Error occurred while retrieving course details' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE SubmitAnswer
    @AssignmentId UNIQUEIDENTIFIER,
    @StudentId UNIQUEIDENTIFIER,
    @Text NVARCHAR(2000),
    @Score BIGINT = 0,        -- Thêm điểm số với giá trị mặc định là NULL
    @Feedback NVARCHAR(2000) = NULL,  -- Thêm phản hồi với giá trị mặc định là NULL
    @Status NVARCHAR(50) = 'Pending'  -- Thêm trạng thái với giá trị mặc định là 'Pending'
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra xem bản ghi đã tồn tại chưa
        IF EXISTS (
            SELECT 1
            FROM [Submission]
            WHERE [AssignmentId] = @AssignmentId
              AND [StudentId] = @StudentId
        )
        BEGIN
            -- Nếu bản ghi đã tồn tại, cập nhật thông tin
            UPDATE [Submission]
            SET 
                [Score] = @Score,
                [Feedback] = @Feedback,
                [Status] = @Status,
                [UpdatedAt] = CURRENT_TIMESTAMP
            WHERE 
                [AssignmentId] = @AssignmentId
                AND [StudentId] = @StudentId;
        END
        ELSE
        BEGIN
            -- Nếu bản ghi chưa tồn tại, thêm mới bản ghi
            INSERT INTO [Submission] (
                [SubmissionId],
                [AssignmentId],
                [StudentId],
                [Text],
                [Score],
                [Feedback],
                [Status],
				[CreatedAt],
				[UpdatedAt]
            ) VALUES (
                NEWID(), -- Tạo một UUID mới cho SubmissionId
                @AssignmentId,
                @StudentId,
                @Text,
                @Score,
                @Feedback,
                @Status,
				DEFAULT,
				DEFAULT
            );
        END
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        SELECT 
            'Error occurred while submitting the answer' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE GetSubmissionsByCourseAndTeacher
    @AssignmentId UNIQUEIDENTIFIER,
    @TeacherId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @CourseId UNIQUEIDENTIFIER;

        -- Lấy CourseId từ bảng Assignments
        SELECT @CourseId = a.CourseId
        FROM Assignments a
        WHERE a.AssignmentId = @AssignmentId;

        -- Kiểm tra xem khóa học có thuộc về giáo viên không
        IF EXISTS (
            SELECT 1
            FROM Course
            WHERE CourseId = @CourseId
              AND LectureId = @TeacherId
        )
        BEGIN
            -- Lấy thông tin về các bài nộp cho khóa học và tên sinh viên
            SELECT 
                s.SubmissionId,
                s.AssignmentId,
                s.StudentId,
                st.UserName AS StudentName, -- Thêm tên sinh viên
                s.Text,
                s.Score,
                s.Feedback,
                s.Status,
                s.CreatedAt,
                s.UpdatedAt
            FROM 
                Submission s
                JOIN Assignments a ON s.AssignmentId = a.AssignmentId
                JOIN [User] st ON s.StudentId = st.UserId -- Join với bảng Students để lấy tên sinh viên
            WHERE 
                a.CourseId = @CourseId;
        END
        ELSE
        BEGIN
            -- Trả về thông báo rằng khóa học không thuộc về giáo viên
            SELECT 
                'Error: The course does not belong to the teacher.' AS Message;
        END
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        SELECT 
            'Error occurred while retrieving submissions' AS Message,
            ERROR_MESSAGE() AS ErrorDetail;
    END CATCH
END;
GO










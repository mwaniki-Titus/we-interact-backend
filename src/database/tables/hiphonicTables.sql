

-- New one
CREATE DATABASE HIPHONICSMADB 
USE HIPHONICSMADB

CREATE TABLE tbl_user (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    TagName VARCHAR(50),
    Location VARCHAR(100),
    company_name VARCHAR(100) DEFAULT 'Binford Ltd',
    bio VARCHAR(500) DEFAULT 'I am an experienced joiner with well developed skills.',
    website_link VARCHAR(500) DEFAULT 'https://dribbble.com/',
    profileImage VARCHAR(500) DEFAULT 'https://cdn.pixabay.com/photo/2024/02/23/17/26/clock-8592484_1280.jpg',
    welcomed BIT Default 0,
    isDeleted BIT DEFAULT 0,
    isSend BIT DEFAULT 0,
    isFriend Bit DEFAULT 0,
    isGroupMember Bit DEFAULT 0,
    registeredDate DATETIME DEFAULT GETDATE(),
);

SELECT * FROM TBL_user
-- Create Post Table
CREATE TABLE post (
post_id  VARCHAR(255) PRIMARY KEY,
UserID  VARCHAR(255),
content VARCHAR(999) DEFAULT 'no content',
imageUrl VARCHAR(999),
videoUrl VARCHAR(400),
post_date DATETIME DEFAULT GETDATE(),
FOREIGN KEY (UserID) REFERENCES tbl_user (UserID),
);

-- Create Video Table
CREATE TABLE Video (
    videoID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    videoURL VARCHAR(999),
    videoCaption VARCHAR(999) DEFAULT 'no content',
    UploadDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);



-- Create table video category
CREATE TABLE videoCategory (
    categoryID VARCHAR(255) PRIMARY KEY,
    categoryName VARCHAR(255),
	previewURL VARCHAR(999),
    createDate DATETIME DEFAULT GETDATE(),
)

-- Create table category videos
CREATE TABLE CategoryVideos (
    categoryVideosID VARCHAR (255) PRIMARY KEY,
    categoryID VARCHAR (255),
    categoryVideoURL VARCHAR(255),
    FOREIGN KEY (categoryID) REFERENCES videoCategory (categoryID)
);

-- Create Friendship Table
CREATE TABLE Friendship (
    FriendshipID VARCHAR(255) PRIMARY KEY,
    User1ID VARCHAR(255),
    User2ID VARCHAR(255),
    FriendshipDate DATETIME,
    isFriend BIT DEFAULT 0,
    FOREIGN KEY (User1ID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (User2ID) REFERENCES tbl_user(UserID)
);



CREATE TABLE tbl_group (
    GroupID VARCHAR(255) PRIMARY KEY,
    GroupName VARCHAR(255),
    Description TEXT,
    group_image VARCHAR(999),
    CreatedByID VARCHAR(255),
    CreatedDate DATETIME DEFAULT GETDATE()
    FOREIGN KEY (CreatedByID) REFERENCES tbl_user(UserID)
);


CREATE TABLE GroupActivity (
    GroupActivityID VARCHAR(255) PRIMARY KEY,
    GroupID VARCHAR(255),
    description TEXT,
    activity_photo VARCHAR(999),
    UploadedByID VARCHAR(255),
    CreatedDate DATETIME DEFAULT GETDATE()
    FOREIGN KEY (UploadedByID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID)
);


-- Create Trigger to Add Group Creator as Member
GO
CREATE TRIGGER trgAfterInsertGroup
ON tbl_group
AFTER INSERT
AS
BEGIN
  -- Insert the creator as a member into GroupMembers table
  INSERT INTO GroupMembers (GroupID, MemberID)
  SELECT i.GroupID, i.CreatedByID
  FROM inserted i;
END;



-- Create GroupMembers Table
CREATE TABLE GroupMembers (
    GroupID VARCHAR(255),
    MemberID VARCHAR(255),
    PRIMARY KEY (GroupID, MemberID),
    FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID) ON DELETE CASCADE,
    FOREIGN KEY (MemberID) REFERENCES tbl_user(UserID)
);


-- Create Message Table
CREATE TABLE Message (
    MessageID VARCHAR(255) PRIMARY KEY,
    SenderID VARCHAR(255),
    ChatID VARCHAR(255),
    MessageDate DATETIME,
    Content TEXT,
    FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (ChatID) REFERENCES tbl_chat(ChatID)
);


CREATE TABLE tbl_chat(
    ChatID VARCHAR(255) PRIMARY KEY,
    SenderID VARCHAR(255),
    ReceiverID VARCHAR(255),
    ChatDate DATETIME,
    FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES tbl_user(UserID)
)



CREATE TABLE Notifications (
  NotificationID INT IDENTITY(1,1) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES tbl_user(UserID),
  message VARCHAR(255),
  is_read BIT DEFAULT 0,
  created_at DATETIME DEFAULT GETDATE()
);



CREATE TABLE Status (
  StatusID VARCHAR(255) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES tbl_user(UserID),
  StatusText VARCHAR(255),
  ImagePath VARCHAR(255),
  CreatedAt DATETIME DEFAULT GETDATE()
);


-- Create Event Table
CREATE TABLE Event (
    EventID VARCHAR(255) PRIMARY KEY,
    EventName VARCHAR(255),
    Description TEXT,
    EventDate VARCHAR(100),
    Location VARCHAR(100),
    EventPosterURL VARCHAR(999)
);
 

 
 
-- Create EventAttendee Table
CREATE TABLE EventAttendee (
    EventID VARCHAR(255),
    AttendeeID VARCHAR(255),
    PRIMARY KEY (EventID, AttendeeID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (AttendeeID) REFERENCES tbl_user(UserID)
);
 



CREATE TABLE Photo (
    PhotoID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    PhotoURL VARCHAR(999),
    UploadDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);
 


-- Trigger for creating notifications after a friendship is inserted
GO


CREATE TRIGGER trgAfterInsertFriendship
ON Friendship
AFTER INSERT
AS
BEGIN
  DECLARE @User1ID VARCHAR(255), @User2ID VARCHAR(255);
  DECLARE @User1Name NVARCHAR(255), @User2Name NVARCHAR(255);

  SELECT @User1ID = User1ID, @User2ID = User2ID
  FROM inserted;

  -- Assuming your Users table has columns UserID and UserName
  SELECT @User1Name = UserName FROM tbl_user WHERE UserID = @User1ID;
  SELECT @User2Name = UserName FROM tbl_user WHERE UserID = @User2ID;

  INSERT INTO Notifications (UserID, message)
  VALUES (@User1ID, 'You are now friends with ' + @User2Name);

  INSERT INTO Notifications (UserID, message)
  VALUES (@User2ID, 'You are now friends with ' + @User1Name);
END;





GO
CREATE TRIGGER tr_UpdateIsFriendStatus
ON Friendship
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @User1ID VARCHAR(255), @User2ID VARCHAR(255);

    -- Assuming you have columns User1ID and User2ID in the Friendship table
    SELECT @User1ID = User1ID, @User2ID = User2ID
    FROM inserted;

    -- Update isFriend to true for both users
    UPDATE tbl_user
    SET isFriend = 1
    WHERE UserID IN (@User1ID, @User2ID);
END;






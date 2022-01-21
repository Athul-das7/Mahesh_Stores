SET SQL_SAFE_UPDATES = 0;

DROP DATABASE IF EXISTS sql6466617;
CREATE DATABASE sql6466617;
USE sql6466617;

create table Admin_table(
    adminId varchar(15) primary key,   
    email varchar(30) not null,
    passwrd varchar(15) not null
);

create TABLE Devices(
    deviceId VARCHAR(15) PRIMARY key,
    catageory VARCHAR(15) not NULL,
    variant VARCHAR(15) not null, 
    quantity int NOT NULL,
    img blob not null
);

create TABLE Users(
    rollNo VARCHAR(15) PRIMARY key,
    studentname VARCHAR(15) not NULL,
    contact VARCHAR(10) not null, 
    email VARCHAR(20) NOT NULL
);

create TABLE Cart(
    cartId VARCHAR(15) PRIMARY key,
    devList VARCHAR(15) not NULL,
    given boolean not null, 
    returned boolean NOT NULL
);

create TABLE Transactions(
    transId VARCHAR(15) PRIMARY key,
    cart_Id VARCHAR(15) not NULL,
    roll_No VARCHAR(15) not null, 
    startDate date NOT NULL,
    endDate date NOT NULL,
    TransComp date ,
    compList VARCHAR(15),
    foreign key(cart_Id) references Cart(cartId) on delete set null,
    foreign key(roll_No) references Users(rollNo) 
);

create TABLE Fine(
    roll_No VARCHAR(15) PRIMARY key,
    fineAmount VARCHAR(15) not NULL,
    transId VARCHAR(15) not null, 
    foreign key(transId) references Transactions(transId),
    foreign key(roll_No) references Users(rollNo) 
);


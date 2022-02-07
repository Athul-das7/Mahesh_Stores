INSERT INTO Admin_table(adminId,email,passwrd) VALUE
("1602-19-735-000","test@gmail.com","test");

INSERT INTO Devices(deviceId,catageory,variant,quantity,img) VALUE
("em-nm","embedded","nodemcu",10,"/assets/gojo.png");

INSERT INTO Users(rollNo,studentname,contact,email) VALUE
("1602-19-735-002","Athul","9876543210","Athul@gmail.com");

INSERT INTO Cart(cartId,devList) VALUE
("c008","em-nm,en-nu,us-ts");

INSERT INTO Transactions(transId,cart_Id,roll_no,startDate,endDate) VALUE
("t016","c008","1602-19-735-002","2021-1-21","2021-12-21");

INSERT INTO Fine(roll_No,fineAmount,transId) VALUE
("1602-19-735-002","100000","t013");

select * from Admin_table;
select * from Devices;
select * from Users;
select * from Cart;
select * from Transactions;
select * from Fine;

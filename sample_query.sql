INSERT INTO Admin_table(adminId,email,passwrd) VALUE
("1602-19-735-071","athuldas2017@gmail.com","don'tYouDare");

INSERT INTO Devices(deviceId,catageory,variant,quantity,img) VALUE
("em-nm","embedded","nodemcu",10,"/assets/gojo.png");

INSERT INTO Users(rollNo,studentname,contact,email) VALUE
("1602-19-735-000","pradhumna","9876543210","pradhumna@gmail.com");

INSERT INTO Cart(cartId,devList) VALUE
("c004","em-nm,en-nu,us-ts");

INSERT INTO Transactions(transId,cart_Id,roll_no,startDate,endDate) VALUE
("t004","c004","1602-19-735-000","2021-1-21","2021-12-21");

INSERT INTO Fine(roll_No,fineAmount,transId) VALUE
("1602-19-735-132","100000","t001");

select * from Admin_table;
select * from Devices;
select * from Users;
select * from Cart;
select * from Transactions;
select * from Fine;

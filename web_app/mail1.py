import smtplib as sl      #import the smtp library to send mail through scripts
import sys
import password

print(sys.argv)
# ign,name,Useremail,comp = sys.argv
name = sys.argv[1]
Useremail = sys.argv[2]
comp = sys.argv[3:]
print(comp)
smtpobj = sl.SMTP('smtp-mail.outlook.com',587)
#creating a smtp object and connecting to the domain server of mail.outlook.com over the port 587

#you can remove the print statements from the code, its placed to know the status of code execution

print(smtpobj.ehlo())       #this establishes the connection with the server
print(smtpobj.starttls())   #this start the ttls encryption in the server
pswd = password.pswd             #Taking the password as input is safer because if you save it in a script anyone who can access the script will be able to find the password
print(password)
adminEmail = 'vcestudent@outlook.com'
print(smtpobj.login(adminEmail, pswd))  #login in to the smtp server

empStr = ''
for i in comp:
    empStr += i + " "

SUBJECT='Booking Alert'    #subject line

TEXT='''Hey {},        

components are {}

these are your bookings.

Have a nice day
Athul Das.
'''.format(name,empStr)                    #body of the mail

message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)   #concating the strings using string formatting

smtpobj.sendmail(adminEmail,Useremail,message)
#sending the mail from us to the reciever; 071 = user; 091 = reciever; message = subject + body

smtpobj.quit() #quiting the smtp server and deleting the object
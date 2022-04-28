import smtplib as sl      #import the smtp library to send mail through scripts

smtpobj = sl.SMTP('smtp-mail.outlook.com',587)
#creating a smtp object and connecting to the domain server of mail.outlook.com over the port 587

#you can remove the print statements from the code, its placed to know the status of code execution

print(smtpobj.ehlo())       #this establishes the connection with the server
print(smtpobj.starttls())   #this start the ttls encryption in the server
pswd = ''              #Taking the password as input is safer because if you save it in a script anyone who can access the script will be able to find the password
print(smtpobj.login('1602-19-735-071@vce.ac.in', pswd))  #login in to the smtp server

SUBJECT='Smtp Test'    #subject line

TEXT='''Hey harshith,        

I hope you get this mail in your good health. I am writing this mail in regards of nothing. Nothing is very important thing.
Hope you and your family is safe and sound.

Regards,
Athul Das.
'''                    #body of the mail

message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)   #concating the strings using string formatting

smtpobj.sendmail('1602-19-735-071@vce.ac.in','1602-19-735-133@vce.ac.in',message)
#sending the mail from us to the reciever; 071 = user; 091 = reciever; message = subject + body

smtpobj.quit() #quiting the smtp server and deleting the object
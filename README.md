# Customer Relationship Management [CRM]

<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]


<br/>

<!-- ABOUT THE PROJECT -->
## About The Project
<!-- --- -->

CRM software is a tool that's designed to help an organization to offer thier customers a unique and seamless experience, as well as build better relationships by providing a complete picture of all customer interactions. 

Through CRM, customers can post their issues with the product or with the service by creating a tickets. And these tickets will be assigned to the to the dedicated engineers depending their status and all of these can be monitored and altered by the admin.

<br/>

### Moto & Credits :     
* This is a simple CRM system, made as a one of the final project for Bakend Development course by [Relevel](https://relevel.com/home) guided by [Vishwa Mohan](https://www.linkedin.com/in/vishwa-mohan).

<br/>

### Features : 
* Sign up / Sign in 
  <br/> As a customer to raise the issues or as a Engineer to resolve the issues.

* Create, Read, Update and Delete operations on Tickets.

* Admin feature
<br/> Has access to see the raised tickets by all the users or by a particular user and to change the assignee to solve the issue.

* Notification via mail 
<br/> Sending the mail to the creator and assigned engineer on raising the ticket. <br/>  (however, Notification is a different project. You can find that [here](https://github.com/shetty-nithin/Mail_Notification_Application))

<br/>

### Built with : 

* [![MongoDB][MongoDB]][MongoDB-url]

* [![Express.js][Express.js]][Express-url]

* [![Node.js][Node.js]][Node-url]

<br/>
<br/>

## Installation
<br/>

__Installation & Initial Configuration of CRM_App__
<br/>

1. Run the following command in the terminal to clone the repository
   ```sh
   git clone https://github.com/shetty-nithin/CRM_Customer_Relationship_Management
   ```

2. Go inside the root folder

3. Install NPM packages
   ```
   npm install
   ```

4. If you are not integrating the Notification feature, then comment out the notification_app related lines of code.
   ```javascript
   sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`,"ticket has raised", `${customer.email}, ${engineer.email}, yourmail@gmail.com`, "CRM APP");
   // from create ticket function of "controller/ticket.controller.js"


   NOTIFICATION_REST_URL: process.env.NOTIFICATION_REST_URL
   // from "configs/server.config.js"
   ``` 

5. Inside the root folder create one more file with name ".env" and mention the port as below
   ```javascript
   PORT = 8000
   ```

6. Run the server
   ```javascript
   node server.js
   ```
<br/>
<br/>

__Installation & Initial Configuration of Mail_Notification_App__
<br/>

1. Come out of the CRM_App root folder.

2. Run the following command in the terminal to clone the repository
   ```sh
   git clone https://github.com/shetty-nithin/Mail_Notification_Application.git
   ```
   
3. Go inside the Mail_Notification_App root folder

4. Install NPM packages
   ```
   npm install
   ```

5. Inside the root folder create one more file with name ".env" and mention the port as below
   ```javascript
   PORT = 7777
   ```

6. Inside the ".env" file of CRM_App include the notifcation api address just below the PORT number as below 
   ```javascript
   PORT = 8000
   NOTIFICATION_REST_URL = "http://localhost:7777/notiserve/api/v1/notifications"
   ```

7. Uncomment the notification_app related lines of code.
   ```javascript
   sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`,"ticket has raised", `${customer.email}, ${engineer.email}, yourmail@gmail.com`, "CRM APP");
   // from create ticket function of "CRM/controller/ticket.controller.js"

   // Note : Considered "CRM" as the root folder of CRM_App

   NOTIFICATION_REST_URL: process.env.NOTIFICATION_REST_URL
   // from "CRM/configs/server.config.js"
   ``` 

8. Run the server
   ```javascript
   node server.js
   ```

<br/>
<br/>

## Demo
#### SignUp and SignIn <br/><br/>
https://user-images.githubusercontent.com/62413993/196036125-7e9d2731-0d6e-4b9b-8be1-4e9b2ba3e49e.mp4

#### Ticket <br/><br/>
https://user-images.githubusercontent.com/62413993/196036140-64ba2242-f7b4-4670-8e56-18380342ac0e.mp4

#### Admin Operations <br/><br/>
https://user-images.githubusercontent.com/62413993/196036164-a2e3f474-b18b-4c21-8f8d-83a4a4fb4663.mp4


<!-- MARKDOWN LINKS -->
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0072b1
[linkedin-url]: https://www.linkedin.com/in/shetty-nithin/

[MongoDB]: https://img.shields.io/badge/MongoDB-589636?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[Node.js]: https://img.shields.io/badge/Node.js-215732?style=for-the-badge&logo=nodedotjs&logoColor=61DAFB
[Node-url]: https://nodejs.org/en/

[Express.js]: https://img.shields.io/badge/Express.js-D1D3D4?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://expressjs.com/

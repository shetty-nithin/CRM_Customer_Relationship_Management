# Customer Relationship Management [CRM]

<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]


<br/>

<!-- ABOUT THE PROJECT -->
## About The Project
---

CRM software is a tool that's designed to help an organization offer thier customers a unique and seamless experience, as well as build better relationships by providing a complete picture of all customer interactions. 

This is a simple CRM system, made as a final project for Bakend Development course by [Relevel](https://relevel.com/home) guided by [Vishwa Mohan](https://www.linkedin.com/in/vishwa-mohan).

### Features : 
* Sign up / Sign in 
  <br/> As a customer to raise the issues or as a Engineer to resolve the issues.

* Create, Read, Update and Delete operations on Tickets.

* Admin feature
<br/> Has access to see the raised tickets by all the users or by a particular user and to change the assignee to solve the issue.

* Notification via mail 
<br/> Sending the mail to the creator and assigned engineer on raising the ticket. <br/>  (however, Notification is a different project. You can find that [here](https://github.com/shetty-nithin/Mail_Notification_Application))



### Built with : 

* [![MongoDB][MongoDB]][MongoDB-url]

* [![Express.js][Express.js]][Express-url]

* [![Node.js][Node.js]][Node-url]

<br/>

<!-- GETTING STARTED -->
## Installation
---

1. Clone the repository
   ```sh
   git clone https://github.com/shetty-nithin/CRM_Customer_Relationship_Management
   ```
2. Go to inside the root folder

3. Install NPM packages
   ```
   npm install
   ```
4. If you are not integrating the Notification feature, then comment out the notification_app related line of code.
   ```javascript
   sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`,"ticket has raised", `${customer.email}, ${engineer.email}, shettynithin007@gmail.com`, "CRM APP");
   // from create ticket function of "controller/ticket.controller.js"
   ``` 

5. Run the server
   ```javascript
   node server.js
   ```

## Demo
1. SignUp and SignIn <br/>[SignUp and SignIn](../../../../Videos/Captures/signup%20and%20signin.mp4)

2. Ticket <br/>


3. Admin Operations <br/>

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
# Mern-whatsapp-deploy

## This is a web app for a Whatsapp chat interface built using React, CSS, JavaScript, Bootstrap, as well as Mongodb and SocketIO.
The app has four main screens: login, signup, chats and error page.

## Link for the website :
https://whatsapp-ap2-mern.onrender.com/

###  MVC architecture :

![image](https://github.com/ArielElb/AP2-ass2/assets/94087682/083d83ff-69ec-4440-ae8d-b03518def4dc)

The Model-View-Controller (MVC) architecture pattern was used in the development of this web app. Here's a breakdown of how MVC was implemented in the project:

1. Model: The model represents the data and the logic behind it. In this app, the model includes the data related to users, chats, and messages. It interacts with the database (MongoDB) using an Object-Document Mapping (ODM) library like Mongoose. The model is responsible for querying and manipulating the data.

2. View: The view represents the user interface of the application. It is responsible for displaying the data to the user and handling user interactions. In this app, the views are implemented using React, CSS, and Bootstrap. Each screen (login, signup, chats, error page) has its own view components that render the UI elements and handle user input.

3. Controller: The controller acts as an intermediary between the model and the view. It handles user actions, updates the model accordingly, and notifies the view to update the UI. In this app, the controller logic is implemented using JavaScript and SocketIO. It listens for user events, such as submitting a login/signup form or sending a chat message, and performs the necessary operations to update the model and reflect the changes in the view.

### Screenshots

- Login Screen:
<img alt="image" src="https://github.com/ArielElb/AP2-ass1-part2/assets/112009232/24d3eb6d-9974-444f-9efe-1c64cdad9777">

- Signup Screen:
<img alt="image" src="https://github.com/ArielElb/AP2-ass1-part2/assets/112009232/34f1a45a-26c9-436e-9199-9df7b6b91c74">

- Chats Screen:
<img alt="image" src="https://github.com/ArielElb/AP2-ass2/assets/112009232/712ae8bb-6c58-4a40-bc71-ed04dcc276bd">

- Notifications:
<img alt="image" src="https://github.com/ArielElb/AP2-ass2/assets/112009232/18ff4d49-d6ac-479a-ae10-12571fb266cc">

- Error Screan:
<img alt="image" src="https://github.com/ArielElb/AP2-ass1-part2/assets/112009232/145ee075-c5a3-483a-8399-ba8e8bd0ca17">


### Signup Screen :
- Users can enter their name and password to create a new account.
- If the user already has an account, they can click on the "Login" button to go to the login screen.
- validations on the username and the password if the passowrd if too weak a note will be shown below the passowrd/username and and X icon will be shown at the right in red color.
- when the two passwords are matched the icon will turn into a green V that indicates that the password are matched.
- if the user enter a username that already taken an error message will show at the top of the container.
- the created username is inserted to the mongo databse, so that it is available for connection through the login screen.
- upload and image only no videos are suportted

### Chats Screen:
- Users can see their chat list with other users.
- Users can click on a chat to open it and see the chat history, by sending the first message to the contact at the contact you will appear in their  place even if they have not added you.
- Users can send chat messages and communicate with each other, you can send the massage by user ENTER key.
- Add a new contact to the list in the sidebar. You can add a user, by his username but only after he is registered in the system, also you can't add a user twice and you can't add yourself.The sidebar also updates and is sortedfrom the top down by the most recent message sent in chat.
- The chat is also implemeted using IOSockets, giving the ability to be notified by a toast when a new message arrives.

### Technologies Used:
- HTML
- CSS
- Bootstrap and Bootstrap Icons.
- React
- JavaScript
- MongoDB (Mongoose)
- SocketIO

### Credits
- This project was created by Ariel Elbaz,Rotem Zilberman,Ohad Langer

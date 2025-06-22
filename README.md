Welcome to deVapp {collaborative decision voting app} Web-App.

Get started
Installation of dependencies
Mongoose,
jsonwebtoken,
express, 
bcrypt, cookie parser etc.


npm install
```Start the app```

npx expo start
Thought Process

Since the whole idea was to achieve a simple but yet user friendly web app, and to be secured as well.
The first thing was to properly design the code structure for readability and clean code, following  one of the software engineering design pattern which is Separation of Concerns, where i have the layered archictectural style, which is commonly called thne Monolith 
which strictly contains the business/service layer where logic of the app is been implemented. Connected to database which is the persistence Layer. In other to Authenticate and Authorize user, Local storage was used  to store tokens.
I also the implented the Role-Based authentication on the back-end.

Technology Used
This is a full stack  project created with
Node Js and Typescript on the backend 
ReactJs and Typescript,
Tailwind css for styling on the frontend 
MongDb/Mongoose Atlas for Database.
Token-based Auth: All protected routes are accessed using JWTs, securely stored and attached via headers.


Deployment link
Backend: https://de-vapp.onrender.com
Frontend: https://devapp-frontend.vercel.app/

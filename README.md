# APDS-POE-PART-3_CODE-SMELLS
APDS Part 3

##PAYMENT APPLICATION##

##PROJECT OVERVIEW##

The Payment Application is a web-based platform built using Node.js and Express for the backend, and React for the frontend.
It allows users to securely submit payment information, manage their accounts, and interact seamlessly with the system.
Additionally, the application includes an Employee Portal, enabling employees to log in and view all customer payments, verify transactions, and manage accounts efficiently.

##TECHNOLOGIES USED##

* Node.js: JavaScript runtime for backend development
* Express: Web framework for Node.js to handle routing and requests
* React: Frontend framework for building interactive UIs
* MongoDB: NoSQL database for storing user data, payment details, and transaction logs
* CORS: Middleware for Cross-Origin Resource Sharing
* Helmet: Security middleware to set HTTP headers
* Rate Limiting: Prevents abuse of payment submission route
* OpenSSL: SSL/TLS certificates for secure communication over HTTPS

##Features##

* User Registration: New users can create an account by providing their details, including name, account number, and password.
* User Login: Registered users can securely log in to access their account information and submit payments.
* Submit Payment: Users can securely submit payment details such as amount, currency, provider, account info, and SWIFT code.
* Token-based Authentication: Uses JWT (JSON Web Tokens) to secure user sessions and protect access to sensitive routes.
* HTTPS: SSL certificates ensure encrypted communication between the server and client.
* Employee Portal: Employees can log in to view all payments made by customers, verify payments, and manage customer accounts.
* Admin Verification: Admin users can verify transactions made by customers, ensuring that payments are processed correctly.

##USER LOGIN AND REGISTRATION##

* Registration:
Users can create an account by entering their name, account number, and password.
The application validates the information and stores it securely in MongoDB.

* Login:
Users can log in using their credentials.
Upon successful login, a JWT is generated and stored in the user's local storage,
providing secure access to protected routes.

##EMPLOYEE PORTAL##

* Employee Login:
Employees can log in with their credentials to access the Employee Portal.

* View Payments:
Once logged in, employees can view a list of all payments made by customers,
including details such as transaction amount, currency, and status.

* Verify Payments:
Employees can verify payments that have been made, ensuring that all transactions are legitimate and correctly processed.

* Admin Functionality:
Administrators can approve or reject payments after review and ensure the application is functioning properly.

##HOW TO RUN THE PROJECT##

* Install Dependencies: Navigate to the project directory and run:

bash
Copy code
npm install

* Start the Server: In the server directory, run:

bash
Copy code
npm start
The server will be accessible at https://localhost:5000.

* Run the Frontend: In the client directory, run:

bash
Copy code
npm start
The application will be accessible at http://localhost:5000.

* Access the Employee Portal: Employees can log in by navigating to /employee-login on the frontend.

##SECURITY MEASURES##

* CORS: Configured to allow only specific trusted origins for security.
* Helmet: Used to set secure HTTP headers, helping protect the application from various web vulnerabilities.
* Rate Limiting: Prevents abuse and excessive requests to the payment submission route.
* SSL/TLS Encryption: The application uses HTTPS to ensure secure data transmission.

##CONCLUSION##
This Payment Application provides a secure and user-friendly platform for managing payments and transactions.
The addition of an Employee Portal enhances the ability of employees to monitor and verify customer payments, improving the overall functionality of the system.

##CODE ATTRIBUTIONS##

* W3Schools Node.js Tutorial
* GeeksforGeeks Express.js Guide
* Cloudflare Web Application Security Guide


##DEVELOPER DETAILS##
Yasheen Kallidass
Email: st10084579@vcconnect.edu.za

Yashwin Ellappa Reddi
Email: st10073402@vcconnect.edu.za

##REPO LINK FOR SONA AND CIRCLE CI##
https://github.com/ST10073402/APDS-POE-PART-3_CODE-SMELLS.git

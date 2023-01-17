# Shipping Instruction Demo

## Description
This application represents sample order system using [Adobe Document Services API](https://developer.adobe.com/document-services/homepage).

Please refer [this movie](https://youtu.be/lP58Jr3lLYk) for this demo. (The movie explains about electric sign with Acrobat Sign API but this sample does not contains the sign portion).

This app consists of two parts, frontend and backend.
Frontend is React UI app and backend is a spring boot app.


## Requirement

Frontend: Node.js is required.

Backend: Adobe PDF Services API credential is required to run this sample. API credential is availabe from the above url. Backend contains placeholder of pdfservices-api-credentials.json and private.key. Please replace them after getting your credential.

## Build
### Backend
~~~
cd backend
mvn package
~~~

### Frontend
~~~
cd frontend
npm install
~~~

## Run
Run backend first otherwise frontend will encounter error.
### Backend
~~~
cd backend
mvn spring-boot:run
~~~
### Frontend
~~~
cd frontend
npm start
~~~

Access to http://localhost:3000 to open the application.

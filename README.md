# Vehicle Booking System
This project is a full-stack application that allows users to book vehicles. It consists of a backend server built with Node.js and PostgreSQL, as well as a frontend built with React.

## Prerequisites
Node.js (v22 or later)
PostgreSQL (for database setup)


## Backend Setup 
- Go to backend folder and install Dependencies by runing
##### `npm install`

## Setting Up PostgreSQL Database

Update your .env file (or your database connection config) to include the following environment variables:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<your_password>
DB_NAME=vehicle_booking

Replace <your_password> with your actual PostgreSQL password.

### Running Migrations & Seed Data

Ensure you have Sequelize and associated packages installed for managing migrations and seed data:
#### `npm install sequelize sequelize-cli pg pg-hstore`
Run migrations to set up the database schema:
#### `npx sequelize-cli db:migrate`
Seed the database with initial data (optional, if seeders are created):
#### `npx sequelize-cli db:seed:all`

## Running the Backend
#### `npm start`

The backend server will be running at http://localhost:3000.

## Frontend Setup
Installing Dependencies (Frontend)

Navigate to the frontend directory (or wherever your React project is located) and install the frontend dependencies:
#### `npm install`

### Running the Frontend
#### `npm start`

The React frontend will be running at http://localhost:4200.
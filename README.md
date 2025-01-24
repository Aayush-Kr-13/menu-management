# Menu Management System

The **Menu Management System** is a backend application built using Node.js, Express, and MongoDB. It provides APIs to manage items, categories, and sub-categories for a menu system. This project allows users to create, retrieve, update, and search items in the menu.

## Features
- Create and manage items with attributes like name, image, description, tax, discount, and category associations.
- Fetch all items under a specific category or sub-category.
- Search items by name or retrieve an item by ID.
- Automatic calculation of total amount based on tax and discount.

---

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Aayush-Kr-13/menu-management.git
cd menu-management
```
### 2. Setup Environment Variables
Create a .env file in the root directory and configure the following variables:
```bash
MONGO_URI="Your MongoDB connection string"
PORT="Port number for the application (e.g., 8080)"
```
### 3. Install Dependencies
Install the required Node.js dependencies using npm:
```bash
npm install
```
### 4. Start the Application
Start the server:
```bash
npm start
```
The server will run on the port specified in the .env file (default: 8080).
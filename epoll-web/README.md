# ePoll Web Application

This web application allows users to list existing polls, view poll options and their current vote counts, vote for an option in a poll, and create new polls. The application uses a backend server API described in the documentation.

## Prerequisites

- Node.js and npm installed on your machine.
- Backend server (ePoll API) is running and accessible.

## Getting Started

Follow the steps below to set up and run the ePoll web application:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/epoll-web.git
cd epoll-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend API URL
Open src/App.js and update the backendApiUrl variable with the URL of your backend API.

```bash
// src/App.js
const backendApiUrl = 'http://localhost:8081/api'; // Replace with your backend API URL
```

### 4. Run the Application
```bash
npm start
```
The application will be available at http://localhost:3000 in your web browser.

### Usage
Visit http://localhost:3000 to access the ePoll web application.
Explore existing polls, view details, and vote for options.
Create new polls using the "Create a New Poll" section.
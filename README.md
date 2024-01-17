# evitec
# project: epoll
### This project is done as part of the employment examination at Evitec Oy. 

# ePoll Application

ePoll is a simple application to gather opinions through polls. It provides a REST API for creating polls, fetching poll details, voting, and more.

## Getting Started

These instructions will guide you on setting up and running the ePoll application.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running (you can use a local instance or a cloud-based service)

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/evitec-test-epoll.git
    ```

2. Navigate to the project directory:

    ```bash
    cd evitec-test-epoll
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the project root and add your MongoDB connection string. Example:

    ```
    MONGODB_URI=mongodb://localhost:27017/epoll
    ```

### Database Setup

1. Ensure that MongoDB is running.

2. The application will automatically create the necessary database and collections on startup.

### Running the Application

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running at `http://localhost:8081` (or the port specified in your `.env` file).

### API Endpoints

- List all polls:

    ```
    GET /api/polls
    ```

- Get a specific poll:

    ```
    GET /api/polls/{id}
    ```

- Vote for a poll option:

    ```
    POST /api/polls/{id}/vote/{option}
    ```

- Create a new poll:

    ```
    POST /api/polls/add
    ```

### Usage Examples

- List all polls:

    ```bash
    curl http://localhost:8081/api/polls
    ```

- Get a specific poll:

    ```bash
    curl http://localhost:8081/api/polls/1
    ```

- Vote for a poll option:

    ```bash
    curl -X POST http://localhost:8081/api/polls/1/vote/2
    ```

- Create a new poll:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"title": "New Poll", "options": ["Option 1", "Option 2"]}' http://localhost:8081/api/polls/add
    ```

## FRONTEND
The front-end of this application is inside the folder
```bash
epoll-web
```

## Author
Turzo Ahsan Sami


[![Watch the video](https://i.stack.imgur.com/Vp2cE.png)](https://youtu.be/D_PyMYWuLbk)

[<img src="https://img.youtube.com/vi/D_PyMYWuLbk/hqdefault.jpg" width="600" height="300" />](https://www.youtube.com/embed/)

# Django Chatbot Application

This is a simple Django application featuring a chatbot interface. The chatbot allows users to interact with predefined responses and prompts. The application is containerized using Docker for ease of deployment and development.

## Features

- Chatbot interface with message display and user input.
- Dynamically checks for predefined replies from a JSON file.
- If no reply is found, the user is prompted to add a response.
- Responsive design with distinct styles for user and bot messages.
- Docker setup for seamless deployment.

## Requirements

- Docker
- Docker Compose

## Installation

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Nachiket-D/Chat-Bot.git
cd Chat-Bot
```

### Build and Run with Docker

Ensure you have Docker and Docker Compose installed. Then, build and start the application using Docker Compose:

```bash
docker-compose up --build
```

This command will build the Docker image, set up the PostgreSQL database, and start the Django development server.

## Accessing the Application

Once the Docker containers are up and running, you can access the chatbot application in your browser at:

```
http://localhost:8000/chat/
```

## Project Structure

- **`chatbot_project/`**: Root directory for the Django project.
  - **`chatbot/`**: The Django app handling chatbot functionality.
    - **`views.py`**: Renders the chatbot interface and processes user messages.
    - **`urls.py`**: URL configurations specific to the chatbot app.
    - **`templates/chatbot/chat.html`**: HTML template for the chatbot UI.
    - **`static/chatbot/styles.css`**: CSS styles for the chatbot interface (including user/bot message styling).
    - **`static/chatbot/scripts.js`**: JavaScript to handle chat form submission and dynamic interactions.
    - **`json/replies.json`**: Contains predefined bot replies. Updated dynamically when a new reply is added.
  - **`chatbot_project/`**: Django project configuration directory.
    - **`urls.py`**: Main URL configuration for the entire project.
  - **`Dockerfile`**: Docker configuration for building the Django app image.
  - **`docker-compose.yml`**: Docker Compose configuration for managing the Django app and PostgreSQL database.
  - **`requirements.txt`**: Python dependencies for the Django application.

## Usage

To interact with the chatbot, navigate to `/chat/` in your browser, type a message, and submit it. If the bot finds a matching response in the JSON file, it will display the reply. If no reply is found, the user will be prompted to add one.

### Chat Features

- **Bot Replies**: Responses are predefined in a `replies.json` file. If the bot doesn't know a reply, a popup prompts the user to add one.
- **Message Styling**: User and bot messages are displayed with distinct styles.
- **Responsive Design**: The chat interface is fully responsive and works on various screen sizes.

## Docker Setup

### Dockerfile

The `Dockerfile` defines the configuration for the Django application image. It handles installation of Python dependencies and running the Django server.

### docker-compose.yml

The `docker-compose.yml` file configures the Django application and PostgreSQL database. It maps ports for easy access and links the services together.

### Running the Application with Docker

To start the application in a Docker environment:

1. Build and run the containers:

    ```bash
    docker-compose up --build
    ```

2. Once running, access the chatbot at:

    ```
    http://localhost:8000/chat/
    ```

3. The database will persist data between sessions using Docker volumes.

## Project Management

This project is set up for easy development and production deployment using Docker. The project structure is designed for extensibility and modularity, with clear separation between app logic, templates, and static files.

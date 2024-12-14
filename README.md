# arn-chat
# Real-Time Chat Application

## Overview

This project is a **Real-Time Chat Application** built using **Spring Boot** and **Angular**. It leverages **WebSocket** technology for seamless, bi-directional communication between the server and clients. The backend is implemented with **Spring WebSocket**, while the frontend integrates **Socket.IO** to enable real-time messaging.

---

## Features

- **Real-time Messaging**: Instantaneous updates between users without page reloads.
- **User Authentication**: Optional login mechanism for secure access.
- **Room-Based Chat**: Users can join specific chat rooms or communicate one-on-one.
- **Scalable Architecture**: Optimized for multiple concurrent users.
- **Responsive Design**: User-friendly interface suitable for both desktop and mobile.

---

## Technology Stack

### Backend:
- **Java**
- **Spring Boot**: For building the REST API and WebSocket server.
- **Spring WebSocket**: For enabling real-time communication.

### Frontend:
- **Angular**: For building the user interface.
- **Socket.IO Client**: For WebSocket communication.

---

## Prerequisites

### Backend:
- Java 17 or later
- Maven 3.8.0+
- Spring Boot 3.x+

### Frontend:
- Node.js 16+
- Angular CLI 15+

---

## Installation

### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/realtime-chat-backend.git
   cd realtime-chat-backend
   ```
2. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. Access the backend API at `http://localhost:8080`.

### Frontend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/realtime-chat-frontend.git
   cd realtime-chat-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular application:
   ```bash
   ng serve
   ```
4. Access the frontend at `http://localhost:4200`.

---

## Configuration

### Backend:
The WebSocket endpoint is defined in `application.properties`:
```properties
server.port=8080
spring.websocket.endpoint=/chat
```

### Frontend:
Update the WebSocket server URL in `environment.ts`:
```typescript
export const environment = {
  production: false,
  websocketUrl: 'http://localhost:8080/chat'
};
```

---

## Usage

1. Launch the backend and frontend applications.
2. Open the frontend in a web browser.
3. Create a username and join a chat room.
4. Start chatting with real-time updates.

---

## WebSocket Endpoints

### Backend:
- `/chat`: WebSocket endpoint for managing messages.
- `/topic/messages`: Topic for broadcasting messages to all connected clients.

---

## Architecture

1. **Client**: Sends and receives messages using **Socket.IO**.
2. **WebSocket Broker**: Manages WebSocket connections using Spring WebSocket.
3. **Message Dispatcher**: Routes incoming messages to appropriate destinations (e.g., specific rooms or users).

---

## Screenshots

| **Login Page**                | **Chat Room**                  |
|-------------------------------|---------------------------------|
| ![Login](link-to-login-image) | ![Chat Room](link-to-chat-room-image) |

---

## Future Enhancements

- Add user presence indicators (online/offline status).
- Implement private messaging with end-to-end encryption.
- Enable file sharing within chat rooms.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com).

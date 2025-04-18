# BE Day 3 – Git, Async JavaScript & REST Basics

## 📌 Topics Covered

- Git basics: `init`, `add`, `commit`, `push`, `pull`
- Asynchronous JavaScript:
  - Callbacks
  - Promises
  - async/await
- REST & HTTP fundamentals

---

## 🧪 Task 1: Fetch API Data

A simple script using `fetch()` to get users from a public API:

---

# Notes API

A RESTful API for managing notes built with Express and TypeScript.

## Features

- Full CRUD operations for managing notes
- TypeScript for type safety
- Error handling middleware
- Request logging
- Input validation
- Clean modular architecture

## Project Structure

```
src/
├── Week-2/
    ├── Notes-API/
        ├── index.ts              # Main entry point
        ├── app.ts                # Express app setup
        ├── routes/               # Route definitions
        │   └── noteRoutes.ts
        ├── controllers/          # Route handlers
        │   └── noteController.ts
        ├── services/             # Business logic
        │   └── noteService.ts
        ├── models/               # Data models
        │   └── Note.ts
        ├── middleware/           # Middleware functions
        │   ├── errorMiddleware.ts
        │   ├── loggerMiddleware.ts
        │   └── validationMiddleware.ts
        └── utils/                # Utility functions
            └── asyncHandler.ts
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/QuiqFlow-Training.git
   cd QuiqFlow-Training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run express-api
   ```

The API will be available at http://localhost:3000.

## API Endpoints

| Method | Endpoint     | Description                   |
|--------|--------------|-------------------------------|
| GET    | /notes       | Get all notes                 |
| GET    | /notes/:id   | Get a note by ID              |
| POST   | /notes       | Create a new note             |
| PUT    | /notes/:id   | Update an existing note by ID |
| DELETE | /notes/:id   | Delete a note by ID           |

## Request Bodies

### Create/Update Note

```json
{
  "title": "Note Title",
  "content": "Note content goes here..."
}
```

## Response Format

Successful responses have the following format:

```json
{
  "status": "success",
  "data": { ... }
}
```

Error responses have this format:

```json
{
  "status": "error",
  "message": "Error message",
  "timestamp": "2023-07-20T12:34:56.789Z",
  "requestId": "e2e4fdfv"
}
```

## Development

### Scripts

- `npm run build` - Build the TypeScript code
- `npm run express-api` - Run the development server with hot reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run check-types` - Check TypeScript types

## Testing

You can test the API using the included Postman collection:
`notes-api.postman_collection.json`

## License

This project is licensed under the MIT License - see the LICENSE file for details.


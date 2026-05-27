# Todo-Api
A minimal RESTful Todo API built with Express and Mongoose.

**Purpose:** simple CRUD API for managing todo items (create, read, update, delete, toggle completion).

## Prerequisites
- Node.js (>= 16)
- npm
- A MongoDB connection string (MongoDB Atlas or local)

## Setup
1. Copy `.env.example` to `.env` (or create a `.env`) and set the variables:

MONGO_URI should include the database name. Example:

MONGO_URI = mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/todo
PORT = 3001

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
node --watch server.js
```

Or using the npm script:

```bash
npm run dev
```

**Folder structure (important files):**
- `server.js` - app entry, connects to MongoDB and starts the server
- `config/db.js` - MongoDB connection helper
- `routes/routes.todo.js` - API routes
- `controllers/todo.controller.js` - request handlers / business logic
- `models/todo.model.js` - Mongoose schema and model
- `middlewares/asyncHandler.js` - async error wrapper
- `middlewares/error.middleware.js` - global error handling

## API Routes
All routes are mounted under the `/api/todos` base path (so the full paths below start with `/api/todos`). Responses are JSON.

- Create a todo
	- Method: POST
	- Path: `/api/add`
	- Body (JSON) - required fields:
	- `title` (string, required) — todo title
	- `description` (string, optional) — todo details
	- Success: 201 Created with created todo object

- Get list of todos
	- Method: GET
	- Path: `/api/`
	- Query parameters (optional):
	- `search` (string) — case-insensitive title search
	- `sort` (`asc` or `desc`) — sort by creation date (default desc)
	- `page` (number) — pagination page (default 1)
	- `limit` (number) — items per page (default 10)
	- Success: 200 OK with paginated data and totals

- Get a todo by id
	- Method: GET
	- Path: `/api/:id`
	- Path params:
	- `id` (MongoDB ObjectId string, required)
	- Success: 200 OK with todo object

- Update a todo
	- Method: PUT
	- Path: `/api/:id`
	- Path params:
	- `id` (MongoDB ObjectId string, required)
	- Body (JSON):
	- `title` (string, required)
	- `description` (string, optional)
	- Success: 200 OK with updated todo object

- Toggle todo completion
	- Method: PATCH
	- Path: `/api/:id/toggle`
	- Path params:
	- `id` (MongoDB ObjectId string, required)
	- Success: 200 OK with updated todo object

- Delete a todo
	- Method: DELETE
	- Path: `/api/:id`
	- Path params:
	- `id` (MongoDB ObjectId string, required)
	- Success: 200 OK with deleted todo object

## Error handling
- All inputs are validated; invalid requests return 400 with an error message.
- Server or database errors return 500 with `error` message.

## Notes / Troubleshooting
- Ensure `MONGO_URI` is valid and includes the database name.
- Watch server logs for connection messages: `MongoDB connected sucessfully` and `Your API is running on <PORT>`.
- Use tools like Postman or curl to test endpoints. Example POST with curl:


# TicTacToe App

Dockerized full-stack TicTacToe application

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Material UI
**Backend:** Node.js, Express, JWT, SQLite (later migration to PostgreSQL, Prisma ORM)
**Database:** (SQLite for testing) will migrate to PostgreSQL

## Getting Started

0. **Install Docker Desktop**

1. **Clone the Repository**:

```bash
git clone https://github.com/DamjannM/TicTacToe-App
cd tictactoe
```

2. **Generate the Prisma Client**:

`npx prisma generate`

3. **Build your docker images**:

`docker compose build`

4. **Create PostgreSQL migrations and apply them**:

`docker compose run app npx prisma migrate dev --name init`

_Also_ - to run/apply migrations if necessary:

`docker-compose run app npx prisma migrate deploy`

5. **Boot up docker containers**:

`docker compose up`

6.  **Access the App**:

Open `http://localhost:5173/` in your browser to see the frontend. You can register, log in, and play X-O against AI from there.
NOTE: You must click on login/register buttons, there is no submit event on pressing ENTER key

The **REST Client** file (`ttt.rest`) is provided to help you test the API using HTTP requests directly. You can run these requests using the **REST Client** extension for VS Code or other compatible tools.

### `ttt.rest`

The `ttt.rest` file includes requests for:

- **Registering a user**: Sends a `POST` request to create a new user.
- **Logging in**: Sends a `POST` request to authenticate a user and retrieve a JWT token.
- **Fetching games**: Sends a `GET` request to fetch the authenticated user's games (JWT required).
- **Adding a game**: Sends a `POST` request to create a new game (JWT required).
- **Updating a game**: Sends a `PUT` request to update an existing game (JWT required).

### How to Use the REST Client

1. Install the **REST Client** extension for VS Code.
2. Open `ttt.rest`.
3. Run the requests by clicking on the "Send Request" link above each block of HTTP code.
4. Make sure to copy the token from the login response and replace `{{token}}` with the actual JWT token for protected routes.

# Your Project Name

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn
- Git
- A PostgreSQL database or another supported database by Prisma

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/<your-username>/<your-repo-name>.git
    cd <your-repo-name>
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    # .env file example

    # Google OAuth Credentials
    CLIENT_ID_EMAIL=<your-client-id>
    CLIENT_SECRET=<your-client-secret>
    REDIRECT_URI=https://developers.google.com/oauthplayground
    REFRESH_TOKEN=<your-refresh-token>

    # Email Configuration
    MY_EMAIL=<your-email-address>

    # Database URL (example for PostgreSQL)
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public
    ```

4. Initialize the database with Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

5. Start the application:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Testing
To test the application, follow these steps:

1. Register a new user by sending a POST request to `/auth/register` with the following JSON body:
    ```json
    {
      "email": "test@example.com",
      "username": "testuser",
      "password": "password123"
    }
    ```

2. Log in with the registered user by sending a POST request to `/auth/login` with the following JSON body:
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

3. Use the obtained JWT token for subsequent requests that require authentication.

### API Documentation
For Comprehensive API Documentation : https://documenter.getpostman.com/view/27904998/2sA3kRJ4DE

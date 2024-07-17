# Restaurant-API

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn
- Git
- A PostgreSQL database or another supported database by Prisma

### Installation

1. Clone the repository:
    ```bash
    git clone -b master https://github.com/Abhishek-dev479/Restaurant-API.git
    cd Restaurant-API
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

    # Github OAuth Credentials
    CLIENT_ID=<your-client-id>
    CLIENT_SECRET_KEY=<your-client-secret>

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

1. Log in as Admin user by sending a POST request to `/auth/login` with the following JSON body:
    ```json
    {
      "email": "admin@gmail.com",
      "password": "adminpassword"
    }
    ```

2. Use the obtained JWT token for subsequent requests that require authentication.

### API Documentation
For Comprehensive API Documentation : https://documenter.getpostman.com/view/27904998/2sA3kRJ4DE

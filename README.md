Restaurant-API
Clone the github repository

git clone https://github.com/yourusername/your-repo-name.git cd your-repo-name
Install dependencies

npm install or yarn install
Set up environment variables
Postgresql database credentials

DATABASE_URL="postgresql://username:password@localhost:5432/your-database"
Github OAuth credentials

CLIENT_ID="your-github-client-id" CLIENT_SECRET_KEY="your-github-client-secret"
Google OAuth credentials

CLIENT_ID_EMAIL = "your-gmail-client-id" CLIENT_SECRET = "your-gmail-client-secret" REDIRECT_URI = https://developers.google.com/oauthplayground REFRESH_TOKEN = "your-refresh-token" MY_EMAIL = "your-gmail-id"
Initialize the database with Prisma

npx prisma migrate dev --name init
Start the server

npm run dev or yarn dev
For Comprehensive API Documentation : https://documenter.getpostman.com/view/27904998/2sA3kRJ4DE


# Book Store Full-Stack Application

This repository contains the source code for a full-stack book store application. The project is divided into two parts:

1. **Client** - A complete [Next.js](https://nextjs.org/) frontend located in the `client` folder.
2. **Server** - A Node.js backend with Elasticsearch for searching books located in the `server` folder.

---

## Features

- **Frontend:** Built with Next.js for a fast, SEO-friendly client-side rendered application.
- **Backend:** Powered by Node.js and Express, with Elasticsearch for efficient search and indexing.
- **Search:** Full-text search support for books.
- **Dockerized Elasticsearch:** Easy setup for Elasticsearch using Docker Compose.

---

## Project Structure

- `client/` - Contains the Next.js frontend application.
- `server/` - Contains the backend code, including the Elasticsearch integration.

---

## Requirements

- Node.js (v16+ recommended)
- Docker and Docker Compose

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bookstore-fullstack.git
cd bookstore-fullstack
```

## API Documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/30048349/2sAXqpAPpU).


### 2. Setting up the Backend


Navigate to the server/ directory.

```bash
cd Server

```

Install the required dependencies using npm:

```bash
npm install
```
### 3. Set Up Environment Variables

Create a `.env` file at the root of the project with the following variables:

```env
MONGO_URI=your_mongodb
PORT=your port//4040
S3_ACCESS_KEY= s3 access key
S3_SECRET_KEY=s3 secrete
```

### 4. Spin Up Elasticsearch using Docker

navigate to /elasticsearch in /Server

Now, spin up Elasticsearch by running:

```bash
docker-compose up
```

Once Elasticsearch is up and running, it should be accessible at `http://localhost:9200`.

You can verify it by running:

```bash
curl http://localhost:9200
```

### 5. Run the API

After setting up Elasticsearch, run the server:

```bash
npm run start:dev
```
or 
```bash
npm run build
npm run start
```

The API will start on `http://localhost:4040`.


### 6. Setting up the Frontend (Next.js)
```bash
cd client
```
Install dependencies for the Next.js application.
```bash
npm install
```
Run the Next.js development server.
```bash
npm run dev
```
Open http://localhost:3000 to see the frontend in action.
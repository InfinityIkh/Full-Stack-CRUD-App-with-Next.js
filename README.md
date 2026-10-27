<!--
  TODO before publishing (delete this block when done):
  1. Add a screenshot or GIF (e.g. docs/screenshot.png) and uncomment the image below.
  2. Add the live demo link if you deploy it.
  3. Name the main data model in "Features" (what a "record" actually is in your app).
  4. Uncomment the "API" section and replace the routes with your real ones.
  5. Add a LICENSE file (the License section below assumes MIT).
  6. Remove any feature below that does not match what the app really does.
-->

# Full-Stack CRUD App with Next.js

A full-stack CRUD application built with **Next.js**, **Prisma** and **MariaDB**. Create, read, update and delete records through a responsive interface backed by a typed API and a relational database.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white)

<!-- ![Screenshot](docs/screenshot.png) -->

## Features

- Full CRUD: create, list, edit and delete records
- Responsive interface styled with Tailwind CSS 4 and Lucide icons
- Type-safe database access with Prisma ORM 7 and the MariaDB driver adapter
- Input validation with Zod
- Client–server communication through an HTTP API (Axios)
- Written in TypeScript and linted with ESLint

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Lucide React |
| Database | MariaDB / MySQL |
| ORM | Prisma 7 with `@prisma/adapter-mariadb` |
| Validation | Zod 4 |
| HTTP client | Axios |

## Getting started

### Prerequisites

- Node.js 20.19 or later (current LTS recommended)
- npm
- A running MariaDB or MySQL server (see step 2)

### 1. Clone and install

```bash
git clone https://github.com/InfinityIkh/Full-Stack-CRUD-App-with-Next.js.git
cd Full-Stack-CRUD-App-with-Next.js
npm install
```

### 2. Prepare a database

Use any MariaDB or MySQL server you already have running locally (XAMPP, Laragon, the official MySQL/MariaDB installer, a hosted database...), then create an empty database:

```sql
CREATE DATABASE crud_db;
```

<details>
<summary>Prefer Docker?</summary>

```bash
docker run --name crud-mariadb \
  -e MARIADB_ROOT_PASSWORD=secret \
  -e MARIADB_DATABASE=crud_db \
  -p 3306:3306 \
  -d mariadb:11
```

Use `secret` as the password in the next step.

</details>

### 3. Configure environment variables

Copy the example file to `.env` in the project root (not `.env.local`: the Prisma CLI loads this file through `dotenv`):

```bash
cp .env.example .env
```

Then adjust the values to match your database server:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api/v1"

DATABASE_URL="mysql://username:@host:port/db_name"
DATABASE_HOST="host"
DATABASE_PORT=port
DATABASE_USER="username"
DATABASE_PASSWORD=""
DATABASE_NAME="db_name"
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the app's API, used by the client (exposed to the browser) |
| `DATABASE_URL` | Full connection string, used by the Prisma CLI |
| `DATABASE_HOST` | Database server host |
| `DATABASE_PORT` | Database server port (3306 by default) |
| `DATABASE_USER` | Database user |
| `DATABASE_PASSWORD` | Database password (empty only for a local root user without a password) |
| `DATABASE_NAME` | Name of the database |

Keep `DATABASE_URL` consistent with the individual `DATABASE_*` values.

### 4. Set up the database

```bash
npx prisma generate     # generate the Prisma client
npx prisma migrate dev  # create the tables from the schema
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project with ESLint |

<!--
## API

Replace `<resource>` with your real resource name and adjust to the routes you actually have.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/<resource>` | List all records |
| `GET` | `/api/v1/<resource>/:id` | Get one record |
| `POST` | `/api/v1/<resource>` | Create a record |
| `PUT` | `/api/v1/<resource>/:id` | Update a record |
| `DELETE` | `/api/v1/<resource>/:id` | Delete a record |
-->

## Project structure

```text
.
├── prisma/              # Prisma schema and migrations
├── src/                 # Application source code (Next.js app)
├── prisma.config.ts     # Prisma CLI configuration (reads DATABASE_URL)
├── next.config.ts       # Next.js configuration
├── eslint.config.mjs    # ESLint configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Deployment

The app deploys well on [Vercel](https://vercel.com). You will need a hosted MariaDB/MySQL database:

1. Set `DATABASE_URL` in your hosting environment variables.
2. Use `prisma generate && next build` as the build command.
3. Apply migrations to the production database with `npx prisma migrate deploy`.

## License

Distributed under the MIT License. See `LICENSE` for details.

## Author

Built by [InfinityIkh](https://github.com/InfinityIkh).

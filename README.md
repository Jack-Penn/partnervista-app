# Clarification

My application is designed as a web-based system utilizing a MySQL database and server-side code for page rendering and data access. In a production environment, the application would be hosted on the internet and easily accessible through a domain name. However, for the purpose of the FBLA competition, to access and view my application, you need to run the application server and database on your local machine.

To facilitate this process, I have provided instructions on leveraging Docker software. These instructions guide users through the setup, allowing them to execute the database server, code, and all necessary dependencies locally.

## Guide to Starting My App Locally

### Requirements:

- Ports 3000 and 3306 must be on your computer.
- Free space on your hard drive for Docker.

### Step 1: Download & Install Docker

1. [Download and install Docker Desktop](https://www.docker.com/products/docker-desktop/) for your OS.
2. Run Docker Desktop and confirm it's running.
3. If installed successfully, the `docker` command should be accessible from the terminal/command line. This can be verified by typing `docker -v` in a terminal window which will display the version number if correctly installed.

### Step 2: Open this Project Folder

1. Open a terminal (Command Prompt on Windows, Terminal on Mac).
2. Navigate to where this project folder is downloaded. On Windows, this may be done by right clicking within the parthnervista-app folder in file explorer and selecting the "Open in Terminal" menu option.

### Step 3: Start Databases and Application

1. Run: `docker-compose up -d` to build and run containers.
2. Run: `docker ps` to list running containers.
3. There should be two containers shown. Copy the container ID associated with the `mysql` image for later use.

### Step 5: Import Your Database Schema

1. Run: `docker exec -i [container_id] mysql -u root partnervista` (replace with copied ID).
2. Type: `source /docker-entrypoint-initdb.d/partnervista-db.sql` and press Enter to import the schema.
3. Press Ctrl+C to exit the MySQL prompt.

### Step 6: Open The NextJS App

1. Open your browser and navigate to http://localhost:3000/partners-list.

Congratulations! You're ready to develop!

### Additional Tips:

- Keep your terminal open while the application runs.
- Stop Docker containers when finished with `docker-compose down`.

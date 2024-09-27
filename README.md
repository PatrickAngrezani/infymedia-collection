# Infymedia Collection

Infymedia Collection is a node.js-bases app designed to handle media uploads with additional API routes for managing tracks, playlists, tags and uses. This software also supports AWS S3 integration for file storage, using `multer` for handling file uploads.

## Features

- **File Upload**: Uses `multer` to store uploaded files locally or in AWS S3.
- **Track, Playlist, Tag and User Management**: Includes separate routes to handle the creation and management of tracks, playlists, tags and users.
- **Body Parsing**: Supports JSON ans URL-encoded body parsing for incoming requests.
- **AWS S3 Integration**: Includes AWS SDK for handling file storage on AWS S3.
- **Swagger API Documentation**: Provides an interactive Swagger UI for testing and exploring the API.

## Technologies Used

- **Node.js**
- **Express.js**: Web framework used to build the REST API.
- **Multer**: Middleware for handling file uploads.
- **AWS SDK**: Used for interacting with AWS services like S3.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **bcryptjs**: For hashing passwords.
- **dotenv**: Loads environment variables.
- **jsonwebtoken**: For authentication via JWT tokens.
- **nodemailer**: For sending emails from the application.
- **Swagger**: API documentation and testing via `swagger-jsdoc` and `swagger-ui-express`.
- **Kubernetes**: Used for container orchestration, managing the deployment, scaling, and networking of containerized applications. 

## Kubernetes Integration

This application is deployed and managed using Kubernetes, which handles the orchestration of containers. It utilizes the following Kubernetes components:

- **Deployments**: To manage the application pods and ensure the right number of instances are running.
- **Services**: To expose the application for internal or external access.
- **ConfigMaps/Secrets**: For managing environment-specific configurations and secrets like API keys.
- **Horizontal Pod Autoscaling**: To automatically scale the application based on demand.

Deployment steps:
1. **Dockerize the app**: Its containerized using Docker.
2. **YAML files**: Kubernetes manifests (YAML files) define the resources like pods, services, and deployments.
3. **Apply Kubernetes manifests**: The manifests are applied to the Kubernetes cluster using kubectl.

## Installation

1. Clone this repository:

```bash
git clone <repositoryurl>
```

2. Navigate to the project directory:

```bash
cd infymedia-colleciton
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the necessary environment variables:

```plaintext
PORT=3000
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

5. Start the server:

```bash
npm start
```

6. Access the Swagger API documentation at: http://localhost:your-port/api-docs

## API Endpoints

**Upload Files**
- **Endpoint**: `/upload`
- **Method**: `POST`
- **Description**: Allows users to upload files. Files are stored on disk or S3, depending on the configuration

**Track Routes**

- **Endpoint**: `/tracks`
- **Description**: Handles routes related to managing tracks.

**Playlist Routes**

- **Endpoint**: `/playlists`
- **Description**: Handles routes related to managing playlists.

**Tag Routes**

- **Endpoint**: `/tags`
- **Description**: Handles routes related to managing tags.

**User Routes**

- **Endpoint**: `/users`
- **Description**: Handles routes related to managing users.

## Development

To start the server in development mde with nodemon for automatic restarts:

```bash
npm run dev
```

## License 
This project is licensed under the ISC License.

## Author
- **Patrick Angrezani**
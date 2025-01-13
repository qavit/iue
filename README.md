# IUE: Taiwanese Multilingual Dictionary App

This project is a Taiwanese multilingual dictionary app built using the MERN stack.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Work Log](#work-log)

## Introduction

This app aims to provide a comprehensive dictionary for Taiwanese languages, including Hakka and indigenous languages, with a modern interface and powerful features.

## Features

- The first dictionary app for all national languages of Taiwan.
- Translation capabilities, potentially enpowered by LLMs.
- User-friendly interface & responsive design.
- Cross-platform compatibility.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/iue.git
cd iue
```

## Backend Setup

1. **Start MongoDB Server**:
   ```bash
   mongod --dbpath /path/to/project --port 27018
   ```

2. **Start Express Server**:
   ```bash
   node server/index.js
   ```
   The server runs on port 5001.

## Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd client
   ```

2. **Start React Development Server**:
   ```bash
   npm start
   ```
   The React app runs on port 3000.

## Usage

Access the frontend via `http://localhost:3000` and use the dictionary features as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Work Log

### 2025-01-13

- Initialized the MERN stack project.
- Set up [Express](https://expressjs.com/) server and MongoDB connection.
- Created React frontend using [Create React App](https://create-react-app.dev/).
- Configured environment variables for API communication.

### 2025-01-14

- Documented setup and run instructions in README.
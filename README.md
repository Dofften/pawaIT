https://pawait.crepant.com/

# pawaIT full stack software engineer assessment 🚀

This repository contains the full-stack application, including a high-performance backend service built with Python and **FastAPI**, and a corresponding frontend buit with **Next.js**.

---

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Python** (version 3.13 or higher)
- **pip** (Python package installer)
- **Node.js** and **npm** (Node Package Manager)

---

## Project Setup

Follow these steps to get both the backend and frontend services running locally.

### 1\. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone https://github.com/Dofften/pawaIT.git
cd pawaIT
```

### 2\. Backend Setup

The backend service powers the application's core logic.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment** (recommended):

    - On macOS/Linux:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
    - On Windows:
      ```bash
      python -m venv venv
      .\venv\Scripts\activate
      ```

3.  **Install the required dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables:**
    Create a `.env` file by copying the example file. This file will hold the AI API keys.

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and fill in the required values.

5.  **Run the backend server:**

    ```bash
    fastapi run
    ```

    The backend will now be running at **[http://127.0.0.1:8000](http://127.0.0.1:8000)**. Keep this terminal open.

### 3\. Frontend Setup

The frontend is the user interface for the pawaIT application.

1.  **Navigate to the frontend directory** from the project's root folder in a **new terminal window**:

    ```bash
    cd frontend
    ```

2.  **Configure environment variables:**
    Create a `.env` file by copying the example file. This file will hold the backend url.

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and fill in the required values.

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Build the application:**

    ```bash
    npm run build
    ```

5.  **Start the frontend server:**

    ```bash
    npm run start
    ```

    The frontend application will now be running, typically at **http://localhost:3000**.

---

## API Documentation

With the backend server running, you can access the interactive API documentation to view and test the available endpoints.

- **Swagger UI:** [BACKEND_URL/docs](BACKEND_URL/docs)
- **ReDoc:** [BACKEND_URL/redoc](BACKEND_URL/redoc)

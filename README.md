# pawaIT

## pawaIT - Backend Service

Backend service for the pawaIT application. This project is built using Python and the high-performance **FastAPI** framework.

---

### Getting Started

Follow these instructions to get the backend server up and running on your local machine for development and testing purposes.

#### Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.13+
- pip (Python package installer)

It is highly recommended to use a virtual environment to manage project dependencies.

#### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Dofften/pawaIT.git
    cd pawaIT/backend
    ```

2.  **Create and activate a virtual environment:**

    - On macOS and Linux:
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
    Create a `.env` file in the backend root directory by copying the example file. Then, fill in the required values (e.g., API keys).

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and add your configuration values.

---

### Running the Application

Once the setup is complete, you can start the development server using fastapi.

```bash
fastapi run
```

The application will be running at **http://127.0.0.1:8000**.

---

### API Documentation

Once the server is running, you can access the interactive API documentation in your browser to test the endpoints.

- **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

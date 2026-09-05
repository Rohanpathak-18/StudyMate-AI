# 📚 StudyMate AI

> An AI-powered personalized learning platform that transforms your study materials into an interactive learning experience using Generative AI, RAG, quizzes, and flashcards.

---

# 🚀 Overview

StudyMate AI is a full-stack AI-powered learning platform designed to help students study using their own documents.

Users can upload study materials such as:

- PDF
- DOCX
- PPTX
- TXT

The system processes these documents, converts them into embeddings, stores them in FAISS, and uses Retrieval-Augmented Generation (RAG) to provide contextual AI responses.

StudyMate AI combines:

- 📄 Document Management
- 🤖 AI Tutor
- 🧠 Retrieval-Augmented Generation
- 📝 Smart Quizzes
- 🃏 AI Flashcards
- 📊 Learning Progress
- 🔐 Secure Authentication
- 🎨 Modern Responsive UI

---

# ✨ Features

## 📄 Knowledge Base

Upload your personal study materials and create an AI-powered knowledge base.

### Supported Formats

- PDF
- DOCX
- PPTX
- TXT

### Document Processing Pipeline

1. Document Upload
2. Text Extraction
3. Text Chunking
4. Embedding Generation
5. FAISS Vector Storage
6. Semantic Search
7. AI Response Generation

---

## 🤖 AI Tutor

Ask questions related to your uploaded learning material.

The AI Tutor uses Retrieval-Augmented Generation to retrieve relevant information from your documents before generating an answer.

### Example

    User:
    Explain the difference between TCP and UDP.

    StudyMate AI:
    TCP is connection-oriented and provides reliable,
    ordered delivery, while UDP is connectionless and
    focuses on faster transmission with lower overhead.

---

## 📝 Smart Quiz

Generate AI-powered quizzes from your study material.

### Features

- Multiple-choice questions
- Configurable question count
- Answer validation
- Explanations
- Score calculation
- Quiz history

### Example

    Question:
    Which protocol is connection-oriented?

    A. UDP
    B. TCP
    C. IP
    D. HTTP

    Answer:
    TCP

---

## 🃏 AI Flashcards

Generate flashcards automatically from uploaded documents.

Each flashcard contains:

    Front:
    What is RAG?

    Back:
    Retrieval-Augmented Generation combines
    information retrieval with language generation
    to produce context-aware responses.

---

## 📊 Dashboard

The dashboard provides an overview of the user's learning activity.

It includes:

- Total documents
- AI conversations
- Learning tools
- Workspace activity
- Learning status

---

## 🔐 Authentication & Security

StudyMate AI uses secure authentication with:

- JWT authentication
- bcrypt password hashing
- Protected React routes
- Express authentication middleware
- User-specific document access

Passwords are never stored in plain text.

---

# 🏗️ System Architecture

    ┌────────────────────────┐
    │      React Client      │
    │     Vite + Tailwind    │
    └────────────┬───────────┘
                 │
                 │ REST API
                 ▼
    ┌────────────────────────┐
    │     Node.js Server     │
    │    Express + MongoDB   │
    └──────────┬─────────────┘
               │
      ┌────────┴─────────────┐
      │                      │
      ▼                      ▼
    ┌──────────────┐   ┌──────────────────┐
    │   MongoDB    │   │   Python FastAPI │
    │     Atlas    │   │    RAG Service   │
    └──────────────┘   └────────┬─────────┘
                                │
                     ┌──────────┴──────────┐
                     │                     │
                     ▼                     ▼
              ┌────────────┐       ┌─────────────┐
              │   FAISS    │       │ Hugging Face│
              │ Vector DB  │       │     LLM     │
              └────────────┘       └─────────────┘

---

# 🧠 RAG Pipeline

StudyMate AI uses Retrieval-Augmented Generation to answer questions using the user's uploaded documents.

    Uploaded Document
           │
           ▼
    ┌──────────────────┐
    │ Document Loader   │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Text Extraction  │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Text Chunking    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Embeddings       │
    │ MiniLM           │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ FAISS Vectorstore│
    └────────┬─────────┘
             │
        User Question
             │
             ▼
    ┌──────────────────┐
    │ Semantic Search  │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Retrieved Context│
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │   LLM Generation │
    └────────┬─────────┘
             │
             ▼
        AI Response

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

## AI / RAG

- Python
- FastAPI
- LangChain
- Hugging Face
- FAISS
- Sentence Transformers
- Retrieval-Augmented Generation

## Authentication

- JSON Web Tokens (JWT)
- bcrypt
- Protected React Routes
- Express Authentication Middleware

---

# 🧠 AI Components

## Embedding Model

    sentence-transformers/all-MiniLM-L6-v2

Used to convert document chunks and search queries into vector embeddings.

## Vector Store

    FAISS

Used to store embeddings and perform semantic similarity search.

## Language Model

    openai/gpt-oss-20b

Used through Hugging Face Inference Providers with Together for:

- AI Tutor responses
- Quiz generation
- Flashcard generation

---

# 🔌 API Overview

## Authentication

    POST /api/auth/register
    POST /api/auth/login
    GET  /api/auth/me

## Documents

    POST   /api/documents/upload
    GET    /api/documents
    DELETE /api/documents/:id

## AI Tutor

    POST /api/chat

## Quizzes

    POST /api/quizzes/generate
    POST /api/quizzes/submit
    GET  /api/quizzes

## Flashcards

    POST /api/flashcards/generate
    GET  /api/flashcards

## Dashboard

    GET /api/dashboard/stats

## RAG Service

    GET  /api/health
    POST /api/index-document
    GET  /api/search
    POST /api/chat
    POST /api/generate-quiz
    POST /api/generate-flashcards

---

# 📁 Project Structure

    StudyMate AI/
    │
    ├── client/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   ├── AppLayout.jsx
    │   │   │   ├── DocumentUpload.jsx
    │   │   │   ├── DocumentList.jsx
    │   │   │   ├── ChatBox.jsx
    │   │   │   ├── ChatMessage.jsx
    │   │   │   ├── ChatMessages.jsx
    │   │   │   ├── QuizCard.jsx
    │   │   │   ├── QuizResult.jsx
    │   │   │   ├── Flashcard.jsx
    │   │   │   └── Loader.jsx
    │   │   │
    │   │   ├── pages/
    │   │   │   ├── Login.jsx
    │   │   │   ├── Register.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Documents.jsx
    │   │   │   ├── Chat.jsx
    │   │   │   ├── Quiz.jsx
    │   │   │   ├── Flashcards.jsx
    │   │   │   ├── Progress.jsx
    │   │   │   └── Profile.jsx
    │   │   │
    │   │   ├── services/
    │   │   │   └── api.js
    │   │   │
    │   │   ├── store/
    │   │   │   └── authStore.js
    │   │   │
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   └── index.css
    │   │
    │   └── .env
    │
    ├── server/
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── documentController.js
    │   │   ├── chatController.js
    │   │   ├── quizController.js
    │   │   └── flashcardController.js
    │   │
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Document.js
    │   │   ├── Conversation.js
    │   │   ├── Quiz.js
    │   │   └── Flashcard.js
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── documentRoutes.js
    │   │   ├── chatRoutes.js
    │   │   ├── quizRoutes.js
    │   │   ├── flashcardRoutes.js
    │   │   └── dashboardRoutes.js
    │   │
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   ├── errorMiddleware.js
    │   │   └── uploadMiddleware.js
    │   │
    │   ├── services/
    │   │   └── ragService.js
    │   │
    │   ├── uploads/
    │   ├── .env
    │   └── server.js
    │
    └── rag/
        ├── loaders/
        │   ├── pdf_loader.py
        │   ├── docx_loader.py
        │   ├── pptx_loader.py
        │   └── text_loader.py
        │
        ├── embeddings/
        │   └── embedding.py
        │
        ├── vectorstore/
        │   └── faiss_store.py
        │
        ├── services/
        │   ├── document_service.py
        │   ├── rag_service.py
        │   ├── quiz_service.py
        │   ├── flashcard_service.py
        │   └── summary_service.py
        │
        ├── vectorstore_data/
        ├── main.py
        ├── requirements.txt
        ├── .env
        └── venv/

---

# ⚙️ Local Setup

## 1. Clone the Repository

    git clone https://github.com/YOUR_USERNAME/studymate-ai.git
    cd studymate-ai

## 2. Install Frontend Dependencies

    cd client
    npm install

## 3. Install Backend Dependencies

    cd ../server
    npm install

## 4. Create the Python Environment

    cd ../rag
    python -m venv venv

### Windows

    .\venv\Scripts\activate

### Linux / macOS

    source venv/bin/activate

Install dependencies:

    pip install -r requirements.txt

---

# 🔐 Environment Variables

Never commit your `.env` files.

## Client

Create:

    client/.env

Add:

    VITE_API_URL=http://localhost:5000/api

## Server

Create:

    server/.env

Add:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    RAG_URL=http://127.0.0.1:8000

## RAG

Create:

    rag/.env

Add:

    HF_TOKEN=your_huggingface_token
    LLM_MODEL=openai/gpt-oss-20b
    HF_PROVIDER=together

---

# ▶️ Running the Application

StudyMate AI uses three services during local development.

## Start RAG Service

    cd rag
    uvicorn main:app --reload --port 8000

## Start Node.js Server

Open another terminal:

    cd server
    npm run dev

## Start React Client

Open another terminal:

    cd client
    npm run dev

Then open the Vite URL shown in the terminal.

---

# 🔒 Security

Never commit sensitive information.

Recommended `.gitignore`:

    node_modules/
    .env
    .env.*
    venv/
    __pycache__/
    *.pyc
    uploads/

Never expose:

- MongoDB credentials
- JWT secrets
- Hugging Face tokens
- API keys
- Private environment variables

---

# 🚀 Deployment Architecture

StudyMate AI can be deployed as three separate services:

    ┌─────────────────────┐
    │   React Frontend    │
    │      Static Site    │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │   Node + Express    │
    │      API Server     │
    └──────────┬──────────┘
               │
      ┌────────┴──────────┐
      │                   │
      ▼                   ▼
    ┌─────────────┐   ┌────────────────┐
    │ MongoDB     │   │ Python FastAPI │
    │   Atlas     │   │   RAG Service  │
    └─────────────┘   └───────┬────────┘
                              │
                              ▼
                       Hugging Face
                           + FAISS

Possible deployment platforms include:

- Render
- Vercel
- Railway
- Other cloud platforms supporting Node.js and Python services

Production environment variables must use deployed service URLs instead of localhost URLs.

---

# 📈 Future Improvements

- Persistent cloud storage for uploaded documents
- Document-specific vector indexes
- Cloud vector database integration
- Conversation history
- Advanced progress analytics
- Personalized learning recommendations
- Spaced repetition
- Streaming AI responses
- Multi-document conversations
- Search and filtering
- AI-generated summaries
- Background document processing
- Redis caching
- Background workers
- Rate limiting
- Role-based access control
- Dockerized deployment

---

# 🎯 What I Learned

Building StudyMate AI provided hands-on experience with:

- Full-stack application architecture
- React development
- REST APIs
- Node.js and Express
- MongoDB and Mongoose
- JWT authentication
- Password hashing
- File uploads
- Document processing
- Python FastAPI
- LangChain
- Hugging Face
- Embeddings
- FAISS vector search
- Retrieval-Augmented Generation
- LLM integration
- Multi-service architecture
- Frontend state management
- Responsive UI development

The project helped me understand how Generative AI can be integrated into a practical full-stack application rather than being used only as a standalone AI demo.

---

# 🌟 Why StudyMate AI?

Traditional studying often requires students to switch between:

    Documents
    Notes
    Search
    Quizzes
    Flashcards
    AI Tools

StudyMate AI brings these capabilities into one learning environment:

             ┌────────────────────┐
             │    StudyMate AI    │
             └─────────┬──────────┘
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Documents       AI Tutor          Practice
                                      │
                              ┌───────┴───────┐
                              ▼               ▼
                            Quiz         Flashcards

The goal is to make studying more interactive, contextual, and personalized using the student's own learning material.

---

# 👨‍💻 Author

## Rohan Kumar Pathak

Computer Science Engineering Student

### Interests

- Full-Stack Development
- Backend Development
- Generative AI
- RAG Systems
- AI-powered Applications

### GitHub

https://github.com/Rohanpathak-18

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐.

Feedback and suggestions are welcome!

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

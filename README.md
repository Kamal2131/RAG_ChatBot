# 🧠 RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot built using Django REST Framework + LangChain + Groq API backend with a React + TypeScript frontend, powered by FAISS vector database and HuggingFace embeddings. This project allows you to ask questions about your API documentation and get precise answers using advanced language models.

## 📦 Features
- 🔍 Ask questions based on your internal API docs
- 🧩 Uses vector search to retrieve relevant context
- 🤖 Queries Groq LLMs for precise answers
- 🖥️ Clean, full-screen chat interface
- 📜 Maintains conversation history in session

## ⚙️ Tech Stack

| Layer           | Stack                                      |
|-----------------|--------------------------------------------|
| **Backend**     | Django, DRF, LangChain, FAISS, Groq API    |
| **Embedding**   | SentenceTransformers (MiniLM)              |
| **Frontend**    | React, Vite, TypeScript, Tailwind, ShadCN  |
| **Vector DB**   | FAISS                                      |

## 🚀 Quick Start

### 🔧 Backend Setup

```bash
# 1. Create virtual environment
python -m venv venv && source venv/bin/activate  # Linux/macOS
# OR for Windows:
.\venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run database migrations
python manage.py migrate

# 4. Start development server
python manage.py runserver
⚠️ Important: Create a .env file in the backend directory with your Groq API key:

env
GROQ_API_KEY=your_groq_key_here
🧪 Frontend Setup
bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
Frontend: http://localhost:5173

Backend: http://127.0.0.1:8000

🧩 RAG Workflow
Document Processing
README.md is split into semantic chunks

Embedding Generation
Chunks are embedded using SentenceTransformers (MiniLM)

Vector Storage
Embeddings stored in FAISS vector database

Query Handling
User question → FAISS retrieves relevant context

LLM Processing
Context + question sent to Groq language model

Response Generation
Precise answer returned via API

🖼️ UI Highlights
Full-screen responsive chat layout

Sticky bottom input field

Scrollable conversation history

Clean sidebar navigation

Modern shadcn/ui components

Type-safe TypeScript implementation

📁 Project Structure
text
backend/
├── chatbot/
│   ├── views.py         # API endpoints
│   ├── qa_chain.py      # LangChain processing
│   ├── faiss_index/     # Vector database
│   └── utils.py         # Helper functions
├── rag_bot/
│   ├── settings.py      # Django configuration
│   └── urls.py          # URL routing
└── manage.py            # Django CLI

frontend/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript definitions
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/
├── index.html
└── vite.config.ts       # Build configuration
✅ Future Improvements
Store chat history in persistent database

Add markdown rendering for LLM responses

Show sources/confidence from FAISS results

Deploy backend on Render/Vercel

Add API documentation upload interface

Implement user authentication

Add rate limiting for API endpoints

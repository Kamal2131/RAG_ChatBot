from langchain.vectorstores import FAISS
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq  # 🧠 Groq LLM wrapper

import os

def get_rag_chain():
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    # db = FAISS.load_local("faiss_index", embeddings)
    db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_kwargs={"k": 5})

    llm = ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.3-70b-versatile",  # or 'llama3-70b-8192', etc.
    )

    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return qa_chain

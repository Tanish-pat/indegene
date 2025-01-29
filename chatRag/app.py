# import os
# import json
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from PyPDF2 import PdfReader
# from dotenv import load_dotenv
# from haystack import Document, Pipeline
# from haystack.document_stores.in_memory import InMemoryDocumentStore
# from haystack.components.embedders import SentenceTransformersDocumentEmbedder, SentenceTransformersTextEmbedder
# from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever
# from haystack.components.builders import ChatPromptBuilder
# from haystack.dataclasses import ChatMessage
# from haystack.components.generators.chat import HuggingFaceAPIChatGenerator
# from haystack.utils import Secret
# from haystack.utils.hf import HFGenerationAPIType

# app = FastAPI()

# # Add CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Update this to specific origins for production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Step 1: Initialize Document Store
# document_store = InMemoryDocumentStore()

# # Step 2: Load PDF documents
# def load_pdfs(pdf_folder="trainDataset"):
#     docs = []
#     for filename in os.listdir(pdf_folder):
#         if filename.endswith(".pdf"):
#             file_path = os.path.join(pdf_folder, filename)

#             # Extract text using PyPDF2
#             reader = PdfReader(file_path)
#             text = ""
#             for page in reader.pages:
#                 text += page.extract_text()

#             # Create a Document object
#             doc = Document(
#                 content=text,
#                 meta={"filename": filename}  # Store filename as metadata
#             )
#             docs.append(doc)
#     return docs

# docs = load_pdfs()

# # Step 3: Generate Embeddings for Documents
# doc_embedder = SentenceTransformersDocumentEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")
# doc_embedder.warm_up()
# docs_with_embeddings = doc_embedder.run(docs)
# document_store.write_documents(docs_with_embeddings["documents"])

# # Step 4: Initialize Components for Retrieval-Augmented Generation (RAG)
# text_embedder = SentenceTransformersTextEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")
# retriever = InMemoryEmbeddingRetriever(document_store=document_store)

# template = [ChatMessage.from_user("""Context: {% for document in documents %} {{ document.content }} {% endfor %} Question: {{question}} Answer:""")]
# prompt_builder = ChatPromptBuilder(template=template)

# # Step 5: Load Hugging Face API Key from .env File
# load_dotenv()
# hf_api_key = os.getenv("HUGGING_FACE_API_KEY")  # Use your Hugging Face API key variable

# if not hf_api_key:
#     raise ValueError("HUGGING_FACE_API_KEY is not set in the environment.")

# # Initialize the HuggingFaceAPIChatGenerator
# chat_generator = HuggingFaceAPIChatGenerator(
#     api_type=HFGenerationAPIType.SERVERLESS_INFERENCE_API,
#     api_params={"model": "HuggingFaceH4/zephyr-7b-beta"},  # Replace with your chosen model
#     token=Secret.from_token(hf_api_key)
# )

# # Step 6: Build the Pipeline
# basic_rag_pipeline = Pipeline()
# basic_rag_pipeline.add_component("text_embedder", text_embedder)
# basic_rag_pipeline.add_component("retriever", retriever)
# basic_rag_pipeline.add_component("prompt_builder", prompt_builder)
# basic_rag_pipeline.add_component("llm", chat_generator)

# # Connect components in the pipeline
# basic_rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
# basic_rag_pipeline.connect("retriever", "prompt_builder")
# basic_rag_pipeline.connect("prompt_builder.prompt", "llm.messages")

# # Define a request model
# class QuestionRequest(BaseModel):
#     question: str

# # Step 7: Create the API endpoint
# @app.post("/ask/")
# async def ask_question(request: QuestionRequest):
#     try:
#         response = basic_rag_pipeline.run({
#             "text_embedder": {"text": request.question},
#             "prompt_builder": {"question": request.question}
#         })
#         return {"answer": response["llm"]["replies"][0].text}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Step 8: Run the API
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)



import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from haystack import Document, Pipeline
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.embedders import SentenceTransformersDocumentEmbedder, SentenceTransformersTextEmbedder
from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever
from haystack.components.builders import ChatPromptBuilder
from haystack.dataclasses import ChatMessage
from haystack.components.generators.chat import OpenAIChatGenerator
import openai

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to specific origins for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Step 1: Initialize Document Store
document_store = InMemoryDocumentStore()

# Step 2: Load PDF documents
def load_pdfs(pdf_folder="trainDataset"):
    docs = []
    for filename in os.listdir(pdf_folder):
        if filename.endswith(".pdf"):
            file_path = os.path.join(pdf_folder, filename)

            # Extract text using PyPDF2
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text()

            # Create a Document object
            doc = Document(
                content=text,
                meta={"filename": filename}  # Store filename as metadata
            )
            docs.append(doc)
    return docs

docs = load_pdfs()

# Step 3: Generate Embeddings for Documents
doc_embedder = SentenceTransformersDocumentEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")
doc_embedder.warm_up()
docs_with_embeddings = doc_embedder.run(docs)
document_store.write_documents(docs_with_embeddings["documents"])

# Step 4: Initialize Components for Retrieval-Augmented Generation (RAG)
text_embedder = SentenceTransformersTextEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")
retriever = InMemoryEmbeddingRetriever(document_store=document_store)

template = [ChatMessage.from_user("""
Given the following information, answer the question.

Context:
{% for document in documents %}
    {{ document.content }}
{% endfor %}

Question: {{question}}
Answer:
""")]
prompt_builder = ChatPromptBuilder(template=template)

# Step 5: Load OpenAI API Key from .env File
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")  # Use your OpenAI API key variable

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY is not set in the environment.")

openai.api_key = openai_api_key

# Initialize the OpenAIChatGenerator
chat_generator = OpenAIChatGenerator(model="gpt-4o-mini")  # Replace with the desired OpenAI model

# Step 6: Build the Pipeline
basic_rag_pipeline = Pipeline()
basic_rag_pipeline.add_component("text_embedder", text_embedder)
basic_rag_pipeline.add_component("retriever", retriever)
basic_rag_pipeline.add_component("prompt_builder", prompt_builder)
basic_rag_pipeline.add_component("llm", chat_generator)

# Connect components in the pipeline
basic_rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
basic_rag_pipeline.connect("retriever", "prompt_builder")
basic_rag_pipeline.connect("prompt_builder.prompt", "llm.messages")

# Define a request model
class QuestionRequest(BaseModel):
    question: str

# Step 7: Create the API endpoint
@app.post("/ask/")
async def ask_question(request: QuestionRequest):
    try:
        # Run the pipeline to get the answer
        response = basic_rag_pipeline.run({
            "text_embedder": {"text": request.question},
            "prompt_builder": {"question": request.question}
        })
        return {"answer": response["llm"]["replies"][0].text}
    except Exception as e:
        # Log the error for debugging
        print(f"Error occurred: {str(e)}")  # Log the error message
        raise HTTPException(status_code=500, detail="An error occurred while processing your request.")

# Step 8: Run the API
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

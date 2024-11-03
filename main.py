from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Create a model for the request body
class PromptRequest(BaseModel):
    prompt: str

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/generate")
async def generate(prompt_request: PromptRequest):
    # Here you would process the prompt and generate a response
    prompt = prompt_request.prompt
    response = process_prompt(prompt)
    return {"response": response}

def process_prompt(prompt: str) -> str:
    # Simulate some processing logic here
    # For example, you could call a machine learning model or some other logic
    return f"Processed the prompt: {prompt}"

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI server!"}


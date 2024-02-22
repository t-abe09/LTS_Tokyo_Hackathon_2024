from typing import Any
from fastapi import FastAPI, File, UploadFile
from embedding.Embedding import analyze_document, read_report
from AI.chain import CustomLLMChain

app = FastAPI()
chain = CustomLLMChain()

@app.get("/")
async def root(): 
    return {"hello world": "happy hackathon"}


@app.post("/analyze-report")
async def analyze_report(file: UploadFile = File(Any)):
    _, content = await analyze_document(file)
    return chain(content)

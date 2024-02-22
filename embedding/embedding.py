from io import BytesIO
from typing import List
from fastapi import File, UploadFile


from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer.aio import DocumentAnalysisClient as ADocumentAnalysisClient
from langchain.vectorstores.azuresearch import AzureSearch

from config import Config

async def analyze_document(file: UploadFile, **kwargs):

    file_bytes = await file.read()
    document_bytes = BytesIO(file_bytes)

    async with ADocumentAnalysisClient(
        endpoint=Config.document_intelligence.get("endpoint"), 
        credential=AzureKeyCredential(Config.document_intelligence.get("credential"))
    ) as form_recognizer: 
        poller = await form_recognizer.begin_analyze_document(
            model_id=Config.document_intelligence.get("model"), 
            document=document_bytes, 
            locale="en-US"
        )
        analyze_result = await poller.result()
    return analyze_result, analyze_result.content

async def read_report(file: str, **kwargs):

    with open(file, "rb") as f:
        file_bytes = f.read()
    document_bytes = BytesIO(file_bytes)
    # document_bytes = file_byte
 

    async with ADocumentAnalysisClient(
        endpoint=Config.document_intelligence.get("endpoint"), 
        credential=AzureKeyCredential(Config.document_intelligence.get("credential"))
    ) as form_recognizer: 
        poller = await form_recognizer.begin_analyze_document(
            model_id=Config.document_intelligence.get("model"), 
            document=document_bytes, 
            locale="en-US"
        )
        analyze_result = await poller.result()
    return analyze_result, analyze_result.content





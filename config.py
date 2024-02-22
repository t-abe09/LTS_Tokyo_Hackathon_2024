import os 
from dotenv import load_dotenv
load_dotenv()

class Config: 
    document_intelligence = {
        "endpoint": "https://document-s0-tier.cognitiveservices.azure.com/",
        "model": "prebuilt-layout",
        "credential": os.environ.get("DOCUMENT_INTELLIGENCE_KEY")
    }
    openai_embedding = {
        'openai_api_key': os.environ.get("OPENAIEMBEDDING_KEY"),
        'openai_api_base': 'https://aic-ivychat.openai.azure.com/',
        'openai_api_version': '2023-05-15',
        'deployment': 'IvyChat_Embeddings',
        'openai_api_type': 'azure',
        'model': 'text-embedding-ada-002',
        'chunk_size': 16
    }
    agent_config = {
        'openai_api_key': os.environ.get("OPENAI_AGENT_API_KEY"),
        'openai_api_base': 'https://ivy-openai.openai.azure.com/',
        'openai_api_version': '2023-07-01-preview',
        'deployment_name': 'gpt-35-turbo-16k',
        'openai_api_type': 'azure',
        'temperature': 0,
        'max_tokens': 4097,
        'model_kwargs': {
            'top_p': 0.95,
            'frequency_penalty': 0,
            'presence_penalty': 0,
            'stop': 'None'
        }
    }

    azure_search = {
        "address": "https://cognitive-search-basic-tier.search.windows.net", 
        "semantic_configuration": "semantic-configuration",
        "api_version": "2020-06-30", 
        "key": os.environ.get("AZURE_SEARCH_KEY")
    }
print(os.environ.get("AZURE_SEARCH_KEY"))
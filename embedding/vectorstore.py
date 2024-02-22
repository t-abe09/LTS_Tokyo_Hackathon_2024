from langchain.vectorstores.azuresearch import AzureSearch
from azure.search.documents.indexes.models import (
    SearchableField,
    SearchField,
    SearchFieldDataType,
    SimpleField,
)
from langchain.embeddings import OpenAIEmbeddings
from config import Config
class AzureSearchFields: 
    default_field = [
        SimpleField(name="id", type=SearchFieldDataType.String, searchable=True, filterable=True,),
        SearchableField(name="content", type=SearchFieldDataType.String, searchable=True, ),
        SearchField(name="content_vector", type=SearchFieldDataType.Collection(SearchFieldDataType.Single), 
                    searchable=True, vector_search_dimensions=1536, vector_search_configuration="default", 
                    ),
        SearchableField(name="metadata", type=SearchFieldDataType.String, searchable=True, ),
        SimpleField(name='key', type=SearchFieldDataType.String, searchable=True, filterable=True, key=True, ),
        SearchField(name="source", type=SearchFieldDataType.String, filterable=True, searchable=True),
        SimpleField(name='len', type=SearchFieldDataType.Int32, filterable=True, searchable=True),
    ]
    embedding_module = OpenAIEmbeddings(
        **Config.openai_embedding
    )

def get_or_create_index(collection_name:str, **kwargs) -> AzureSearch: 
    index = AzureSearch(
        azure_search_endpoint=Config.azure_search.get("address"), 
        azure_search_key=Config.azure_search.get("key"),
        index_name=collection_name,
        semantic_configuration_name=Config.azure_search.get("semantic_configuration"),
        embedding_function=AzureSearchFields.embedding_module.embed_query, 
        fields=AzureSearchFields.default_field
    )
    return index
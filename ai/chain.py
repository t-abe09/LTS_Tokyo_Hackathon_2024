import os 
import re
from typing import Any, List 
import json 
from langchain.chat_models.azure_openai import AzureChatOpenAI
from langchain.output_parsers.json import SimpleJsonOutputParser
from config import Config
from AI.prompt import prompt, prompt_evaluate, prompt_summary, REPORT_SUMMARY, STOCK_ANALYSIS
from embedding.vectorstore import get_or_create_index
import requests

llm = AzureChatOpenAI(**Config.agent_config)


class CustomLLMChain:
    def __init__(self): 
        self.index = get_or_create_index("hackathonatjapan")

    def analyze_report(self, report_content:str): 
        messages = llm.batch([
            prompt.format_prompt(report_content=report_content),
            prompt_evaluate.format_prompt(report_content=report_content),
            prompt_summary.format_prompt(report_content=report_content),
        ])

        return messages
    
    def search_ref(self, messages):
        json_parser = SimpleJsonOutputParser()
        criterias = json_parser.invoke(messages[0])
        final_reponse = {}
        highlight = []
        references = []
        for i in range(len(criterias["answer"])): 
            criteria = criterias["answer"][i]
            search_result = self.index.hybrid_search(criteria, k=1, **{"filters": filters})[0]
            contents = search_result.page_content
            metadata:dict = search_result.metadata
            metadata["reference"] = str(i + 1)
            highlight.append(
                metadata
            )
            references.append(f"{criteria}[{str(i + 1)}]")

        conclusion_text = "\nFollowing is example for "  + ", ".join(references)
        final_reponse["metadatas"] = highlight
        final_reponse['evaluation'] = REPORT_SUMMARY + "\n" + self.postprocess_evaluation(messages[1].content) + conclusion_text + "\n" + STOCK_ANALYSIS
        final_reponse['chartContent'] = self.get_chart_content()
        final_reponse['chartType'] = "vega"
        return final_reponse
    
    # def analyze_report_2(self, report_content)
    def postprocess_evaluation(self, text): 
        texts = text.split("\n\n")
        print(texts)
        for i in range(1, len(texts) - 1): 
            texts[i] = texts[i].replace(">", "ti")
        return "\n\n".join(texts[1:])
    def __call__(self, report_content):
        return self.search_ref(
            self.analyze_report(
                report_content=report_content
            )
        )
    
    def get_chart_content(self): 
        # stock api-endpoint
        URL = "vegaspec-kaostock.azurewebsites.net/vegaspec"        
        stock_data = requests.get(url = URL, params = PARAMS)
        
        # extracting data in json format
        json_object = stock_data.json()

        return json_object
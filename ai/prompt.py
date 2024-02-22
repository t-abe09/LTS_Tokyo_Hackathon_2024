from langchain.prompts import PromptTemplate

prompt_string = """You are an AI assistant working as report analysis expert to support human to read a report of a company.\
A company report is considered as good if it conveys information about five criterias: Raw material price, Inbound demand (Demand), Emerging Manufacturer, Brand Analysis and Shareholder Dividends.

You will read a report delimited by triple backsticks and response which criterias the report lack of information. Write your answer in json format.

Report: 
``` {report_content}```

The missing part in Python json format with key answer:
"""

prompt_string_evaluate = """You are an AI assistant working as report analysis expert to support human to read a report of a company.\
A company report is considered as good if it conveys information about five criterias: Raw material price, Inbound demand (Demand), Emerging Manufacturer, Brand Analysis and Shareholder Dividends.

You will read a report delimited by triple backsticks and give evaluation on these five criterias mentioned in the report.
Remember to conclude which criterias are missing in the report.
Report: 
``` {report_content}```

""" 

prompt_string_summary = """You are an AI assistant working as report analysis expert to support human to read a report of a company.\
Your task is to write a summarization about a report delimited by triple backsticks. Write 3-5 sentences to summarize containing some important information mentioned in the report.

Report: 
``` {report_content}```

Report Summarization: 

"""

prompt = PromptTemplate.from_template(prompt_string)
prompt_evaluate = PromptTemplate.from_template(prompt_string_evaluate)
prompt_summary = PromptTemplate.from_template(prompt_string_summary)

import json
import os
from openai import OpenAI
import gpt.prompts as prompts
import gpt.pdf as pdf
from pydantic import BaseModel
from typing import List
from gpt.json_response import json_data 
# class Tool:
#     code : str
#     name: str  
#     quantity : int
#     manual : str

# class ToolsList(BaseModel):
#     suggestedTools: List[Tool]

class LLMHandler:
    def __init__(self):
        self.__api_key = os.getenv("OPENAI_KEY")

        self.__gpt_client = OpenAI(api_key=self.__api_key)

        self.__user_history_msgs = {}

    def __prompt(self, prompt : str, client: str, format = None):
        self.__user_history_msgs[client].append(
            {
                "role" : "user",
                "content" : prompt,
                }
            )
        
        completion = None

        if format == None:
            completion = self.__gpt_client.chat.completions.create(
                messages=self.__user_history_msgs[client],
                model="chatgpt-4o-latest"
            )
        else :
            completion = self.__gpt_client.chat.completions.create(
                messages=self.__user_history_msgs[client],
                model="chatgpt-4o-latest",
                response_format=format
            )

        
        response = completion.choices[0].message.content

        # print(f"CHAT RESPONSE TO CLIENT {client}: ")
        # print(response)

        return response

    def __add_initial_prompt(self, client : str):
        """initial prompt to describe how subsequent prompts should be. Needs to be called before any prompts

        Args:
            client (str): client to be added
        """
        prompt = prompts.INITIAL_PROMPT

        self.__user_history_msgs[client] = [{
            "role" : "user",
            "content" : prompt
        }]

    def initialize_client(self, client : str) :
        """adds the client to client list and initilizes the first prompt. Needs to be called

        Args:
            client (str): _description_
        """
        self.__add_initial_prompt(client)
    
    def exec_prompt(self, prompt, client, format = None):
        """executes the prompt for this client if it has already initialized the first prompt

        Args:
            prompt (str): prompt
            client (str): client identifier
        """
        if client in self.__user_history_msgs:

            return self.__prompt(prompt, client, format)
        else :
            print("error: not initialized client")

    
    def generate_json(self, description : str, client : str):
        prompt = prompts.GENERATE_TITLE.format(description)

        title = self.exec_prompt(prompt, client)

        # title
        print(f"CHAT RESPONSE TO CLIENT {client}:")
        print("title: ", title)
        print("description: ", description)

        # steps
        generate_steps = prompts.GENERATE_STEPS
        raw_steps = self.exec_prompt(generate_steps, client)

        print("STEPS THAT CHAT GENERATED:")
        print(raw_steps)
        steps = []
        try:
            steps = self.filter_steps(raw_steps)
            print(steps)
        except Exception as err:
            print(" error spliting steps: ", err)

        # tools
        # generate_tool = prompts.GENERATE_TOOLS
        # raw_tools = self.exec_prompt(generate_tool, client)
        raw_tools = json_data
        # tools = self.filter_json_tools(raw_tools)
        print(raw_tools)

        # estimated time
        generate_time = prompts.GENERATE_ESTIMATED_TIME
        time = self.exec_prompt(generate_time, client)

        print(time)

        json = self.fill_json(title, description, steps, raw_tools, time)

        print("\n final json")
        print(json)

        return json

    def filter_json_tools(self, data):
        cleaned_json_string = data.strip("```json").strip("```")

        # Step 2: Wrap the cleaned JSON string in curly braces to make it a valid JSON object
        json_text = "{" + cleaned_json_string + "}"

        # Step 3: Parse the JSON text into a dictionary
        try:
            parsed_data = json.loads(json_text)
            print("Parsed Dictionary:")
            print(parsed_data)
            return parsed_data
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return {}
        

    def filter_steps(self, steps):
        final_steps= []
        for line in steps.splitlines():
            print(line)
            final_steps.append(line)
        
        return final_steps

    def include_pdf(self, path, client):
        text = pdf.extract_text_from_pdf(path)
        if text == "":
            return
        
        # print(text)
        prompt = prompts.INCLUDE_FILE.format(text)
        
        response = self.exec_prompt(prompt, client)

        print(response) 

    def fill_json(self, title: str, description : str, suggested_steps, suggested_tools, estimated_time ):
        # tools = []
        # for tool in suggested_tools:
        #     tools.append({
        #         "code" : tool[],
        #         "name" : ,
        #         "quantity" :,
        #         "manual" : ,
        #     })

        json = {
            "title" : title,
            "description" : description,

            "suggestedSteps" : suggested_steps,
            "suggestedTools" : suggested_tools,
            "estimatedTime" : estimated_time
        }

        return json
    

if __name__ == "__main__" :
    handler = LLMHandler()
    handler.initialize_client("1")
    handler.generate_json("Realizar uma inspeção detalhada na Peneira Poligonal para garantir que não há acúmulo de resíduos que possam comprometer seu funcionamento. Verificar o aquecimento do equipamento e o nível de ruído durante a operação.", "1")
    # handler.include_pdf("files/w22.pdf", "1")
    # handler.exec_prompt("qual a sua funçao?", "1")




""" 
suggested_tools : [
    {
        "code": "T001",
        "name": "Inspection Flashlight",
        "quantity": 1,
        "manual": "https://example.com/inspection-flashlight-manual.pdf"
    },
    {
        "code": "T002",
        "name": "Adjustable Wrench",
        "quantity": 1,
        "manual": "https://example.com/adjustable-wrench-manual.pdf"
    }
]
"""

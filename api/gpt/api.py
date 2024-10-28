import requests
import os
from openai import OpenAI

# Replace 'your-api-key-here' with your actual API key
# openai.api_key = os.getenv('OPENAI_KEY')

# Define your request
# response = openai.Completion.create(
#     model="text-davinci-003",  # You can use other models like "gpt-3.5-turbo"
#     prompt="Hello, how are you?",
#     max_tokens=50,  # Adjust the length of the response
#     temperature=0.7  # Controls randomness; higher means more creative
# )

client = OpenAI (
    api_key=os.getenv("OPENAI_KEY")

)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role" : "user",
            "content" : "Hi chat my number is 3",
        }
    ],
    model="gpt-3.5-turbo"
)

print(chat_completion.choices[0].message.content)
# Print the generated text
# print(response.choices[0].text.strip())


chat_completion = client.chat.completions.create(
    messages=[
        {
            "role" : "user",
            "content" : "my number is 3",
        },
        {
            "role" : "user",
            "content" : "what is my number?",
        }
    ],
    model="gpt-3.5-turbo"
)

print(chat_completion.choices[0].message.content)

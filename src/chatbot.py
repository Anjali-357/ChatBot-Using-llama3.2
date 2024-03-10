import ollama
import gradio as gr


def llama_chatbot(message, history):
    return ollama.generate(model='llama3.2:3b', prompt = message)["response"]


gr.ChatInterface(llama_chatbot).launch(share=True)
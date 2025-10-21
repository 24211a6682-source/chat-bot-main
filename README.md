1. Overview

This project is a Python-based intelligent agent designed to automate responses to customer frequently asked questions (FAQs) for OLynk. It leverages the power of Large Language Models (LLMs) like Google's Gemini API to provide accurate, context-aware answers.

A key feature of this bot is its ability to connect to mock Shopify order data, allowing it to answer specific, personalized questions such as "Where is my package?" or "What was in my last order?".

The primary business goal is to demonstrate a powerful, scalable, and cost-effective solution for automating customer service, reducing response times, and improving customer satisfaction.

2. Features

Intelligent FAQ Answering: Uses LLMs to understand and answer a wide range of customer questions.

Model Benchmarking: Easily configurable to test and compare the performance of different Gemini models (e.g., gemini-pro) to find the optimal balance between accuracy and cost.

Context-Aware Responses: Integrates with a mock Shopify customer database (mock_shopify_data.json) to provide personalized answers based on a user's order history.

Performance Reporting: Generates a clear report comparing models based on key metrics like response quality, speed, and API cost.

3. How It Works

The script follows a simple yet effective workflow:

Input: A customer asks a question (e.g., "What's the status of order #OL1002?").

Data Retrieval: The script identifies the order ID from the query and retrieves the relevant customer and order details from the mock_shopify_data.json file.

Prompt Engineering: It constructs a detailed prompt for the LLM, combining the customer's question with their specific order data as context.

LLM Inference: The prompt is sent to the selected Gemini model via its API.

Response Generation: The model processes the information and generates a natural, human-like response.

Output: The final answer is displayed to the user.

4. Tech Stack

Language: Python 3.x

LLM: Google Gemini API (e.g., gemini-pro)

Core Libraries: google-generativeai, python-dotenv


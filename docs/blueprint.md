# **App Name**: Order Responder

## Core Features:

- Firebase Integration: Securely connect to the company's Firebase project and read data from the Cloud Firestore database to fetch customer order details.
- Context Retrieval: Given a customer's order_id, fetch the corresponding order document from the 'orders' collection in Firestore to gather necessary information.
- Dynamic Prompting: Dynamically construct a prompt for the LLM using the customer's query and the contextual data retrieved from Firestore to tailor the response.
- Model Selection: Configure the script to run queries against either gpt-3.5-turbo or gpt-4o for comparison.
- Response Generation: Process the prompt via the OpenAI API and display the generated text response, acting as a tool by conditionally including the customer data based on the customer's request.
- Cost Analysis: Output the prompt_tokens and completion_tokens used for each response, providing data for cost calculation and model performance evaluation.
- Performance Reporting: Generates a comparison report that detail accuracy, response and cost of responses of different LLM models. These metrics will guide the selection of which LLM is optimal for production usage, displayed with loading states and error handling for robustness.
- Real-time Response Streaming: Implement streaming to display the LLM's response to the UI as the words appear one by one, enhancing the user experience.
- Interactive Accuracy Scorecard: Integrate a direct scoring mechanism into the UI, allowing evaluators to rate accuracy using a star rating component next to each generated response.
- Secure API Endpoint: Secure the Genkit API endpoint using Google Cloud's built-in authentication or a simple API key to prevent unauthorized use and control costs.

## Style Guidelines:

- Primary color: Light cool blue (#72BCD4), reminiscent of clear skies and efficient systems.
- Background color: Very light blue (#E0F7FA), provides a calm backdrop that is easy on the eyes.
- Accent color: A contrasting orange (#FF8A65) to draw attention to important metrics or actionable data.
- Body and headline font: 'Inter' (sans-serif) for a modern, readable interface suitable for data-rich reports.
- Use minimalist, line-based icons to represent different metrics and categories within the performance reports.
- Emphasize a clean, tabular layout to effectively present the comparative data on accuracy and cost across different LLM models.
- Use subtle transitions and animations when toggling between different models' performance data to enhance user engagement without distracting from the core information.
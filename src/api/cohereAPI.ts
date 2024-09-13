import axios from "axios";

const cohereAPI = axios.create({
  baseURL: "https://api.cohere.ai/v1/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Function to generate text with context
export const generateText = async (
  prompt: string,
  history: string[] = [],
  getTitle?: boolean | undefined
) => {
  // Build the contextual prompt
  const context = history.join("\n"); // Join previous interactions
  const fullPrompt = `${context}\nUser: ${prompt}\nAI:`;
  const combineTitlePrompt = `${prompt} ${history}`

  try {
    const response = await cohereAPI.post("generate", {
      model: "command-xlarge-nightly", // Replace with the correct model if needed
      prompt: getTitle ? combineTitlePrompt : fullPrompt,
      max_tokens: 1000,
    });
    return response.data.generations[0].text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// const performChatRequest = async (
//   message: string,
//   chatHistory: { role: string; message: string }[]
// ) => {
//   try {
//     const response = await cohereAPI.post("chat", {
//       message,
//       chatHistory,
//       connectors: [
//         {
//           id: "web-search" // Replace with appropriate connector if needed
//         }
//       ],
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error performing chat request:", error);
//     throw error;
//   }
// };


// Function to handle generating text with context
// export const generateText = async (
//   prompt: string,
//   chatHistory: { role: string; message: string }[] = []
// ) => {
//   // Convert chat history to the required format
//   const formattedHistory = chatHistory.map(
//     (entry) => ({
//       role: entry.role,
//       message: entry.message
//     })
//   );

//   try {
//     // Call the API request function
//     const data = await performChatRequest(prompt, formattedHistory);
//     // Process the response data as needed
//     return data.text; // Adjust based on the API response structure
//   } catch (error) {
//     console.error("Error generating text:", error);
//     throw error;
//   }
// };

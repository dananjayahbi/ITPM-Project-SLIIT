const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

let chat = null; // Store chat instance

const aiBotController = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!chat) {
      // Initialize chat if not already initialized
      chat = model.startChat({
        generationConfig: {
          temperature: 0.65, // Increased for creativity and exploration
          topK: 40, // Wider consideration for diverse possibilities
          topP: 0.95, // Favoring likely tokens while allowing some deviation
          maxOutputTokens: 30000, // Balanced length for code generation
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      });
    }

    // Send user message to the chat
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const botMessage = response.text();

    res.status(200).send({
      bot: botMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
};

module.exports = { aiBotController };

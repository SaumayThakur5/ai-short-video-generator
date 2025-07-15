import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Configuration for the model
const config = {
  responseMimeType: 'text/plain',
};

const model = 'gemini-2.0-flash';

// Function to generate image prompts using Google GenAI
export const GenerateImagePrompts = async (script, videoStyle) => {
  try {
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `Generate Image prompt of ${videoStyle} style with all details for each scene for 30 seconds video:
script: ${script}
Just give specific image prompt depending on the story line
Do not give camera angle image prompt
Follow the following schema and return JSON data (Max 4–5 images)
[
  {
    "imagePrompt": "",
    "sceneContent": "<Script Content>"
  }
]`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `I am unable to generate images directly. The capability to generate images is only enabled for the "Gemini 2.0 Flash Experimental" model when the selected output format is "Images and text". However, I can provide you with the image prompts based on your script in the JSON format you requested.
\`\`\`json
[
  {
    "imagePrompt": "A close-up of Rosa Parks, 42 years old, African American woman with a determined but weary expression, sitting on a bus. It's 1955, and the bus is segregated. Soft, diffused lighting. Authentic 1950s clothing and hairstyle. The mood is serious and resolute. Focus on her eyes.",
    "sceneContent": "Rosa Parks refused to give up her seat on a bus in 1955."
  },
  {
    "imagePrompt": "Wide shot of the Montgomery bus, packed with African Americans in the back and white passengers in the front. The atmosphere is tense and divided. The bus is stopped, and the driver is looking back towards Rosa Parks with an angry expression. 1950s setting, realistic details of the bus interior.",
    "sceneContent": "Her quiet act of defiance sparked the Montgomery Bus Boycott,"
  },
  {
    "imagePrompt": "A large group of African American people walking down a street in Montgomery, Alabama. They are boycotting the buses. Holding signs with slogans like \\"Equality Now\\" and \\"Justice for All\\". The scene is full of energy and determination. Bright daylight. Authentic 1950s attire. Focus on the unity and resilience of the crowd.",
    "sceneContent": "a pivotal moment in the Civil Rights Movement."
  },
  {
    "imagePrompt": "A montage of historical images representing the Civil Rights Movement. This could include Martin Luther King Jr. giving a speech, protestors marching, and the signing of the Civil Rights Act. Black and white imagery with a sense of historical significance. Transition seamlessly between images to convey a sense of progress and change.",
    "sceneContent": "One person's bravery can inspire lasting change for everyone."
  }
]
\`\`\``,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `Generate Image prompt of ${videoStyle} style with all details for each scene for 30 seconds video:
script: ${script}
Just give specific image prompt depending on the story line
Do not give camera angle image prompt
Follow the following schema and return JSON data (Max 4–5 images)
[
  {
    "imagePrompt": "",
    "sceneContent": "<Script Content>"
  }
]`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = '';
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }

    // Extract JSON from the response
    const jsonMatch = fullResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // If no JSON block found, try to parse the entire response
    return JSON.parse(fullResponse);
    
  } catch (error) {
    console.error('Error generating image prompts:', error);
    throw new Error('Failed to generate image prompts');
  }
};

// Export other existing functions if you have them
// export const GenerateImageScript = ...
// export const ImagePromptScript = ...
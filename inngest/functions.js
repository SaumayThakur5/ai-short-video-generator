import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
import { GenerateImagePrompts } from "../configs/AiModel"; // ✅ Import the new function
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const BASE_URL = 'https://aigurulab.tech';

export const GenerateVideoData = inngest.createFunction(
  { id: 'generate-video-data' },
  { event: 'generate-video-data' },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice, recordId } = event?.data;
    const convex= new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    const GenerateAudioFile = await step.run("GeneratedAudioFile", async () => {
      try {
        const result = await axios.post(`${BASE_URL}/api/text-to-speech`,
          { input: script, voice: voice },
          {
            headers: {
              'x-api-key': process.env.AIGURULAB_API_KEY,
              'Content-Type': 'application/json',
            },
          });
        console.log(result.data.audio);
        return result.data.audio;
      } catch (error) {
        console.error("Audio generation failed:", error?.response?.data || error.message);
        throw new Error("Failed to generate audio");
      }
      return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1751750959230.mp3?alt=media&token=92674908-f293-4668-b16f-5a429e2fe69a";
    });

    const GenerateCaptions = await step.run(
      "generateCaptions",
      async () => {
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          {
            url: GenerateAudioFile,
          },
          {
            model: "nova",
          }
        );
        return result?.results?.channels[0]?.alternatives[0]?.words;
      }
    );

    const GenerateImagePrompt = await step.run(
      "generateImagePrompt",
      async () => {
        try {
          const result = await GenerateImagePrompts(script, videoStyle);
          return result;
        } catch (error) {
          console.error("Image prompt generation failed:", error);
          throw new Error("Failed to generate image prompts");
        }
      }
    );

    const GenerateImages= await step.run(
      "generateImages",
      async()=>{
        let images=[];
        images= await Promise.all(
          GenerateImagePrompt.map(async(element)=>{
            const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: element?.imagePrompt,
            model: 'sdxl',//'flux'
            aspectRatio:"1:1"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process.env.AIGURULAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
         console.log(result.data.image)
         return result.data.image;
          })
        );
        return images;

      }
    )

    const UpdateDB= await step.run(
      'UpdateDB',
      async()=>{
        console.log('About to update DB with recordId:', recordId);
         const result= await convex.mutation(api.videoData.UpdateVideoRecord,{
          recordId: recordId,
          audiourl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages
         })
         return result;
      }
    )

    return "Executed Successfully";
  }
);
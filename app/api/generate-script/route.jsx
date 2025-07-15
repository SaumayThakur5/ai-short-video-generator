import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Init Gemini - Note: Use server-side env variable, not NEXT_PUBLIC_
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    console.log('🎯 API route hit - /api/generate-script');
    
    const { topic } = await req.json();
    console.log('📝 Received topic:', topic);

    if (!topic) {
      console.log('❌ No topic provided');
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    console.log('✅ API key found, proceeding with generation...');

   const prompt = `Write two different scripts for a 30-second video on Topic: ${topic}. 

Each script should be a plain spoken narration as if it's being read by a voiceover artist. 
Do not include timestamps, screen directions (e.g., "Scene:", "Close-up", "Quick cuts", or "SOUND of..."), or formatting like bold or markdown. 
Avoid describing camera movements or visual effects. Just give the narration text.

Respond in valid JSON format like this:
{
  "scripts": [
    {
      "content": "Script 1..."
    },
    {
      "content": "Script 2..."
    }
  ]
}`;


    console.log('🤖 Generating content with Gemini...');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Flash model has higher rate limits
    });

    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (error) {
      if (error.message.includes('429') || error.message.includes('quota')) {
        console.log('⏳ Rate limit hit, returning helpful error message');
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please wait a moment and try again.', 
          retryAfter: 60 // seconds
        }, { status: 429 });
      }
      throw error; // Re-throw other errors
    }

    const text = result.response.text();
    
    console.log('🎉 Raw AI response received');
    console.log('📄 Raw response:', text);

    // Clean any markdown-style code fences
    const cleanedText = text.replace(/```json|```/g, '').trim();
    console.log('🧹 Cleaned text:', cleanedText);

    let json;
    try {
      json = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Text that failed to parse:', cleanedText);
      
      // Fallback: try to extract JSON from the response
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          json = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
      }
    }

    console.log('✅ Parsed JSON successfully:', json);
    console.log('📊 Returning response to client');
    return NextResponse.json(json);
    
  } catch (err) {
    console.error('💥 Error in API route:', err);
    console.error('🔍 Error stack:', err.stack);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: err.message 
    }, { status: 500 });
  }
}
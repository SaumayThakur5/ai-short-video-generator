import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.json();
    console.log('Received formData:', formData); // Add this log
    
    const result = await inngest.send({
        name: 'generate-video-data',
        data: {
            ...formData
        }
    });
    
    console.log('Inngest send result:', result); // Add this log
    return NextResponse.json({ result: result });
}
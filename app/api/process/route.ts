import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { input } = await req.json();

        if (!input) {
            return NextResponse.json({ error: "Input is required" }, { status: 400 });
        }

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'SYSTEM PROMPT GOES HERE',
                    },
                    {
                        role: 'user',
                        content: input,
                    },
                ],
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const data = await response.json();

        const result =
            data?.choices?.[0]?.message?.content || "No response from AI";

        return NextResponse.json({ result });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
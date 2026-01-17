import { GoogleGenAI } from '@google/genai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

export function isGeminiConfigured(): boolean {
    return !!apiKey && apiKey !== 'your-api-key-here'
}

export async function extractGradientFromImage(base64Image: string): Promise<string[]> {
    if (!isGeminiConfigured()) {
        throw new Error('Gemini API key not configured. Add your key to .env file.')
    }

    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
            {
                inlineData: {
                    data: base64Image.replace(/^data:image\/\w+;base64,/, ''),
                    mimeType: 'image/jpeg',
                },
            },
            `Analyze this image and extract up to 7 dominant colors that would make a beautiful gradient.
Return ONLY a JSON array of hex color codes, like: ["#ff0000", "#00ff00", "#0000ff"]
Order the colors from darkest to lightest, or in a way that creates a smooth gradient flow.
Do not include any other text or explanation, just the JSON array.`,
        ],
    })

    const text = response.text || ''

    // Extract JSON array from response
    const match = text.match(/\[[\s\S]*?\]/)
    if (!match) {
        throw new Error('Could not parse gradient colors from AI response')
    }

    try {
        const colors = JSON.parse(match[0]) as string[]
        // Validate hex colors
        const hexRegex = /^#[0-9A-Fa-f]{6}$/
        const validColors = colors.filter(c => hexRegex.test(c))

        if (validColors.length === 0) {
            throw new Error('No valid hex colors found in AI response')
        }


        return validColors.slice(0, 7)
    } catch {
        throw new Error('Could not parse gradient colors from AI response')
    }
}

export async function parseShaderProps(code: string): Promise<Record<string, unknown>> {
    if (!isGeminiConfigured()) {
        throw new Error('Gemini API key not configured')
    }

    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `Extract the React props from this code snippet as a JSON object.
                        
Code:
${code.slice(0, 2000)}

Return ONLY a valid JSON object where keys are prop names and values are the prop values.
Example output: {"color": "#ff0000", "speed": 0.5}
Do not include markdown formatting or explanations.`
                    }
                ]
            }
        ],
    })

    const text = response.text || ''
    const match = text.match(/\{[\s\S]*\}/)

    if (!match) {
        throw new Error('Could not parse JSON from AI response')
    }

    try {
        return JSON.parse(match[0])
    } catch (e) {
        throw new Error('Invalid JSON received from AI')
    }
}

import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_SK_KEY,
    dangerouslyAllowBrowser: true
});

//Todo[]: Ajustar el chat para que tenga contexto

export async function generateAIMessage(message: string, emotion?: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: 'system', content: `You are a helpful assistant, you can give some advice. ${emotion && `User feels ${emotion}.`} Format your responses as JavaScript-compatible text. 
                    - Use appropriate line breaks (\n) to separate logical parts of the response.` },
                {
                    role: 'user',
                    content: message
                }
            ]
        })
        console.log("Chat gpt response", completion.choices[0].message.content)
        return completion.choices[0].message.content
    } catch (error) {
        console.log(error)
    }
}
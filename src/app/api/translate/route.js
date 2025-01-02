import { TranslationServiceClient } from '@google-cloud/translate';

const client = new TranslationServiceClient();

export async function POST(req) {
  try {
    const { text, targetLanguage } = await req.json(); // Use `req.json()` to parse request body in Next.js App Router

    const [response] = await client.translateText({
      parent: `projects/rathore-433710/locations/global`,
      contents: [text],
      targetLanguageCode: targetLanguage,
    });

    return new Response(JSON.stringify({ translatedText: response.translations[0].translatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Translation failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

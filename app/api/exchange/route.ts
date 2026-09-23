import { NextResponse } from 'next/server';

const PROHIBITED_KEYWORDS = ['drug', 'substance', 'weapon', 'contraband', 'pills'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    const contentToScan = `${title} ${description}`.toLowerCase();
    const containsProhibitedContent = PROHIBITED_KEYWORDS.some(word => contentToScan.includes(word));

    if (containsProhibitedContent) {
      return NextResponse.json(
        { error: 'Listing blocked by automated NLP safety screening. Prohibited items detected.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Exchange listing passed safety screening.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process exchange request.' }, { status: 500 });
  }
}

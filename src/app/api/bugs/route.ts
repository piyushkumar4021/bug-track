import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bugSchema } from '../../../schemas';

export async function GET() {
  try {
    const bugs = await prisma.bug.findMany();
    return NextResponse.json(bugs);
  } catch {
    return NextResponse.json({ error: 'Failed to get bugs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid Json' }, { status: 400 });
  }

  const validation = bugSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const newBug = await prisma.bug.create({
      data: { title: body.title, description: body.description },
    });
    return NextResponse.json(newBug, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create Bug' },
      { status: 500 }
    );
  }
}

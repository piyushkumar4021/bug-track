import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
});

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

  const validation = schema.safeParse(body);

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

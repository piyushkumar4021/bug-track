import { NextRequest, NextResponse } from 'next/server';
import { bugSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const validatedId = parseInt(id);

  if (!validatedId)
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const bug = await prisma.bug.findUnique({ where: { id: validatedId } });
  if (!bug)
    return NextResponse.json({ error: 'Bug not found' }, { status: 404 });

  return NextResponse.json(bug, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const validatedId = parseInt(id);

  if (!validatedId)
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const bug = await prisma.bug.findUnique({ where: { id: validatedId } });
  if (!bug)
    return NextResponse.json({ error: 'Bug not found' }, { status: 404 });

  let body = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid Json' }, { status: 400 });
  }

  const validation = bugSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.formErrors },
      { status: 400 }
    );

  const updatedBug = await prisma.bug.update({
    where: { id: validatedId },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(updatedBug, { status: 200 });
}

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BugForm from '../../_components/BugForm';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditBugPage({ params }: Props) {
  let bug = null;
  try {
    bug = await prisma.bug.findUnique({ where: { id: parseInt(params.id) } });
  } catch {
    notFound();
  }

  if (!bug) return notFound();

  return <BugForm bug={bug} />;
}

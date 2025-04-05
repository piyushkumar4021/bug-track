import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import BugStatusBadge from '../../../components/BugStatusBadge';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {
    id: string;
  };
}

export default async function BugsDescriptionPage({ params }: Props) {
  const bug = await prisma.bug.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!bug) notFound();

  return (
    <div>
      <Heading>{bug.title}</Heading>
      <Flex gapX={'3'} my={'2'}>
        <BugStatusBadge status={bug.status} />
        <Text>{bug.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt={'3'}>
        <ReactMarkdown>{bug.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

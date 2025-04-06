import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import BugStatusBadge from '../../../components/BugStatusBadge';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default async function BugsDescriptionPage({ params }: Props) {
  let bug = null;
  try {
    bug = await prisma.bug.findUnique({ where: { id: parseInt(params.id) } });
  } catch {
    notFound();
  }

  if (!bug) return notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'4'}>
      <Box>
        <Heading>{bug.title}</Heading>
        <Flex gapX={'3'} my={'2'}>
          <BugStatusBadge status={bug.status} />
          <Text>{bug.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt={'3'}>
          <ReactMarkdown>{bug.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href={`/bugs/${bug.id}/edit`}>Edit Bug</Link>
        </Button>
      </Box>
    </Grid>
  );
}

import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import BugStatusBadge from '@/components/BugStatusBadge';
import { Bug } from '@prisma/client';

export default function BugDisplay({ bug }: { bug: Bug }) {
  return (
    <Box>
      <Heading>{bug.title}</Heading>
      <Flex gapX={'3'} my={'2'}>
        <BugStatusBadge status={bug.status} />
        <Text>{bug.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt={'3'}>
        <ReactMarkdown>{bug.description}</ReactMarkdown>
      </Card>
    </Box>
  );
}

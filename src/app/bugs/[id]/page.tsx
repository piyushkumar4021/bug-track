import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BugDeleteButton from './BugDeleteButton';
import BugDisplay from './BugDisplay';
import BugEditButton from './BugEditButton';

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
    <Grid columns={{ initial: '1', md: '5' }} gap={'6'}>
      <Box className='lg:col-span-4'>
        <BugDisplay bug={bug} />
      </Box>
      <Box>
        <Flex direction='column' gapY='2'>
          <BugEditButton bugId={bug.id} />
          <BugDeleteButton bugId={bug.id} />
        </Flex>
      </Box>
    </Grid>
  );
}

import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BugDeleteButton from './BugDeleteButton';
import BugDisplay from './BugDisplay';
import BugEditButton from './BugEditButton';
import SessionOnly from '@/components/SessionOnly';
import AssigneeSelect from '@/components/AssigneeSelect';

interface Props {
  params: { id: string };
}

export default async function BugsDescriptionPage({ params }: Props) {
  const id = +params.id;
  if (Number.isNaN(id)) return notFound();

  const bug = await prisma.bug.findUnique({ where: { id } });
  if (!bug) return notFound();

  const users = await prisma.user.findMany();

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap={'6'}>
      <Box className='lg:col-span-4'>
        <BugDisplay bug={bug} />
      </Box>
      <SessionOnly>
        <Box>
          <Flex direction='column' gapY='2'>
            <AssigneeSelect users={users} />
            <BugEditButton bugId={bug.id} />
            <BugDeleteButton bugId={bug.id} />
          </Flex>
        </Box>
      </SessionOnly>
    </Grid>
  );
}

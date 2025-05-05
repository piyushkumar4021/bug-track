import { Box, Table } from '@radix-ui/themes';
import BugStatusBadge from '@/components/BugStatusBadge';
import { prisma } from '@/lib/prisma';
import SessionOnly from '@/components/SessionOnly';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default async function BugsPage() {
  return (
    <Box>
      <SessionOnly>
        <BugsActions />
      </SessionOnly>
      <BugsList />
    </Box>
  );
}

const BugsActions = () => {
  return (
    <Box className='mb-5'>
      <Button>
        <Link href='/bugs/new'>Create a bug</Link>
      </Button>
    </Box>
  );
};

const BugsList = async () => {
  const bugs = await prisma.bug.findMany();

  return (
    <Table.Root variant='surface' size={'3'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            Status
          </Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            Created At
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {bugs.map((bug) => (
          <Table.Row key={bug.id}>
            <Table.Cell>
              <Link href={`/bugs/${bug.id}`}>{bug.title}</Link>
              <div className='md:hidden'>
                <BugStatusBadge status={bug.status} />
              </div>
            </Table.Cell>

            <Table.Cell className='hidden md:table-cell'>
              <BugStatusBadge status={bug.status} />
            </Table.Cell>

            <Table.Cell className='hidden md:table-cell'>
              {bug.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

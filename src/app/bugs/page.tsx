import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import BugStatusBadge from '../../components/BugStatusBadge';

export default async function BugsPage() {
  const bugs = await prisma.bug.findMany();

  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href='/bugs/new'>Create a bug</Link>
        </Button>
      </div>

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
              <Table.RowHeaderCell>
                {bug.title}
                <div className='md:hidden'>
                  <BugStatusBadge status={bug.status} />
                </div>
              </Table.RowHeaderCell>
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
    </div>
  );
}

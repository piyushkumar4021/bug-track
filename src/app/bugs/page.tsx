import { Table } from '@radix-ui/themes';
import BugStatusBadge from '../../components/BugStatusBadge';
import Link from '../../components/Link';
import { prisma } from '../../lib/prisma';
import BugsActions from './BugsActions';

export default async function BugsPage() {
  const bugs = await prisma.bug.findMany();

  return (
    <div>
      <BugsActions />

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
                <Link href={`/bugs/${bug.id}`}>{bug.title}</Link>
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

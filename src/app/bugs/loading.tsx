import { Skeleton, Table } from '@radix-ui/themes';
import BugsActions from './BugsActions';

const skeletons = [1, 2, 3];

export default function BugsPageSkeleton() {
  return (
    <div>
      <BugsActions />

      <Table.Root variant='surface' size={'3'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              <Skeleton />
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {skeletons.map((i) => (
            <Table.Row key={i}>
              <Table.RowHeaderCell>
                <Skeleton />
                <div className='md:hidden'>
                  <Skeleton />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

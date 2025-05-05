import { Skeleton, Table } from '@radix-ui/themes';

export default function BugsPageSkeleton() {
  const skeletons = [1, 2, 3];

  return (
    <div>
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
              <Table.Cell>
                <Skeleton />
                <div className='md:hidden'>
                  <Skeleton />
                </div>
              </Table.Cell>
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

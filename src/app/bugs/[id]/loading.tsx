import { Card, Flex, Skeleton } from '@radix-ui/themes';

export default function Loading() {
  return (
    <div className='max-w-xl'>
      <Skeleton height='1.5rem' />
      <Flex gapX={'3'} my={'2'}>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose space-y-4' mt={'3'}>
        {[1, 2, , 3, 4, 5].map((i) => (
          <Skeleton height='1rem' key={i} />
        ))}
      </Card>
    </div>
  );
}

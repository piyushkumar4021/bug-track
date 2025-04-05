import { Skeleton } from '@radix-ui/themes';

export default function LoadingNewBugsPage() {
  return (
    <div className='max-w-xl space-y-4'>
      <Skeleton height='1rem' />
      <Skeleton height='12rem' />
    </div>
  );
}

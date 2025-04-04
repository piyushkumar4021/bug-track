import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function BugsActions() {
  return (
    <div className='mb-5'>
      <Button>
        <Link href='/bugs/new'>Create a bug</Link>
      </Button>
    </div>
  );
}

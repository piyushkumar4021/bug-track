import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function BugsPage() {
  return (
    <div>
      <Button>
        <Link href='/bugs/new'>Create a bug</Link>
      </Button>
    </div>
  );
}

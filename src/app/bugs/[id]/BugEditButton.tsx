import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function BugEditButton({ bugId }: { bugId: number }) {
  return (
    <Link href={`/bugs/${bugId}/edit`} legacyBehavior>
      <Button>Edit Bug</Button>
    </Link>
  );
}

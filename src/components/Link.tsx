import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
  children: string;
  href: string;
}

export default function Link({ children, href }: Props) {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}

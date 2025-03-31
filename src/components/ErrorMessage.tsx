import { Callout } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;

  return (
    <Callout.Root color='red'>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}

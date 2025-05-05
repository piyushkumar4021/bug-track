import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions';
import { PropsWithChildren } from 'react';

export default async function SessionOnly({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return null;
  return <div>{children}</div>;
}

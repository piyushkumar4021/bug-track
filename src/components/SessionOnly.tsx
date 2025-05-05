import { getServerSession } from 'next-auth';
import { authOptions } from '../app/auth/authOptions';
import { PropsWithChildren } from 'react';

export default async function SessionOnly({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return null;
  return <div>{children}</div>;
}

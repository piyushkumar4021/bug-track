'use client';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Flex, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa6';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Bugs',
    href: '/bugs',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
    <nav className='flex px-5 h-14 mb-5 justify-between items-center border-b'>
      <Flex align={'center'} gapX={'7'}>
        <Link href='/' className='flex items-center gap-x-2 text-lg'>
          <FaBug size={24} />
          BugTrack
        </Link>

        <ul className='flex space-x-5'>
          {links.map(({ label, href }) => (
            <li
              key={href}
              className={clsx('text-zinc-500 hover:text-zinc-900 transition', {
                'text-zinc-900': pathname === href,
              })}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </Flex>

      {status === 'unauthenticated' && (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
      {status === 'authenticated' && (
        <Flex align={'center'} gapX={'5'}>
          <Flex align={'center'} gapX={'2'}>
            <Image
              className='rounded-full'
              src={data.user!.image!}
              width={24}
              height={24}
              alt='User Image'
            />
            <Text>{data.user?.name}</Text>
          </Flex>
          <Button variant='outline' onClick={() => signOut()}>
            Sign out
          </Button>
        </Flex>
      )}
    </nav>
  );
}

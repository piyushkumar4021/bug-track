'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <nav className='px-5 py-4 mb-5 border-b'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gapX='7'>
            <Link href='/' className='flex items-center gap-x-2 text-lg'>
              <FaBug size={24} />
              BugTrack
            </Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthStatus />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Bugs', href: '/bugs' },
  ];

  return (
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
  );
};

const AuthStatus = () => {
  const { data, status } = useSession();

  if (status === 'loading') return null;
  if (status === 'unauthenticated')
    return <Button onClick={() => signIn()}>Sign in</Button>;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={data!.user!.image!}
          fallback='?'
          radius='full'
          size='2'
          className='cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Box px='3'>
          <Text as='p'>{data?.user?.name}</Text>
          <Text size='1'>{data?.user?.email}</Text>
        </Box>
        <DropdownMenu.Item onClick={() => signOut()}>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

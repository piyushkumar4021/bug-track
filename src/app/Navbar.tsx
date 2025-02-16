'use client';
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

  return (
    <nav className='flex px-5 space-x-8 h-14 mb-5 items-center border-b'>
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
    </nav>
  );
}

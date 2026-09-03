'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Descobrir' },
  { href: '/swipe', label: 'Swipe' },
  { href: '/alertas', label: 'Alertas' }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Caça Preço — início">
          <span className="brand-mark">CP</span>
          <span>
            <strong>Caça Preço</strong>
            <small>price discovery lab</small>
          </span>
        </Link>

        <nav className="topnav" aria-label="Navegação principal">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} data-active={active || undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <span>Public portfolio build · synthetic catalog</span>
        <span>Next.js · TypeScript · Motion</span>
      </footer>
    </div>
  );
}

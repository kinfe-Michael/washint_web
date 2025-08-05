"use client";

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onMouseOver?: ()=>void,
  onMouseLeave?:()=>void,
}

const NavLink: React.FC<NavLinkProps> = ({ children, className, activeClassName, href, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== href) {
      NProgress.start();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Link
      href={href}
      className={`${className || ''} ${isActive && activeClassName ? activeClassName : ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;

import NavLink from '@/app/components/CustomNavLink';
import React from 'react'

function DashboardButton({ children, onClick, icon, fullWidth = false,routeTo }:any) {

  return (
  <NavLink href={routeTo || ''}
    onClick={onClick}
    className={`
      flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
      bg-transparent border-2 border-zinc-700 text-zinc-300
      hover:bg-zinc-800 transition-colors duration-200 rounded-full
      ${fullWidth ? 'w-full' : ''}
    `}
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);
}

export default DashboardButton
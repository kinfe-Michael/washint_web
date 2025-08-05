"use client";

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
});

const ProgressBar: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {


    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [pathname]);

  return null;
};

export default ProgressBar;

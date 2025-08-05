"use client";

import { useRouter as useNextRouter } from 'next/navigation';
import NProgress from 'nprogress';

type AppRouterInstance = ReturnType<typeof useNextRouter>;

interface CustomRouter extends AppRouterInstance {
  push: (href: string, options?: Parameters<AppRouterInstance['push']>[1]) => void;
  replace: (href: string, options?: Parameters<AppRouterInstance['replace']>[1]) => void;
}

export const useCustomRouter = (): CustomRouter => {
  const router = useNextRouter();

  const push: CustomRouter['push'] = (href, options) => {
    NProgress.start();
    router.push(href, options);
  };

  const replace: CustomRouter['replace'] = (href, options) => {
    NProgress.start();
    router.replace(href, options);
  };

  return {
    ...router,
    push,
    replace,
  };
};

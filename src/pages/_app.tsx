import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from '@/router';
import superjson from 'superjson';

import 'tailwindcss/tailwind.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      transformer: superjson,
      url,
    };
  },
})(MyApp);

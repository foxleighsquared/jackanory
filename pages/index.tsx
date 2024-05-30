import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PageLoader } from 'partials/page-loader';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    sessionStorage.removeItem('redirectPath');
    if (redirectPath && redirectPath !== '/') {
      router.push(redirectPath);
    } else {
      router.push('/home');
    }
  }, [router]);

  return <PageLoader />;
};

export default Home;

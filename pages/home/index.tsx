import React, { useEffect, useState } from 'react';
import Store from 'lib/services/store';
import { useGetPeopleQuery, getPeople } from 'lib/services/test-data-api';

import AuthenticatedLayout from 'templates/authenticated-layout';
import { PageLoader } from 'partials/page-loader';
import { List, RichText } from 'components';

import config from 'app-config';

/**
 * The Home page is the default page for the application
 */
export const Home: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const {
    data: people,
    isFetching,
    isLoading
  } = useGetPeopleQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: false
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) return <PageLoader />;

  return (
    <AuthenticatedLayout title="Welcome">
      <RichText>
        <h2>Welcome to {config.appName}</h2>
        <p>
          This is a sample page to show you what a page looks like. Take a look
          at <em>pages/home/index.tsx</em> to take a look at the code
        </p>
        <p>
          You can also take a look at the docs at{' '}
          <a href="//localhost:6006">localhost:6006</a> (If you are using the{' '}
          <a href="//localhost:6006/?path=/docs/documentation-introduction--docs#devkit">
            devkit
          </a>{' '}
          script, it has probably already opened, check your tabs)
        </p>
        {isFetching ? (
          <p>Reloading data...</p>
        ) : (
          <List
            type="unordered"
            items={people?.map((person: (typeof people)[0]) => person.name)}
          />
        )}
      </RichText>
    </AuthenticatedLayout>
  );
};

// Hydrate the page with server-side data
export const getServerSideProps = Store.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getPeople.initiate(null));

    return { props: {} };
  }
);

export default Home;

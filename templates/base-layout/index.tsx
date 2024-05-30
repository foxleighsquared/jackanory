import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import config from 'app-config';

/* Import Styles */
import styles from './styles.module.scss';

/* Import style variables */
import colourvars from 'styles/export/_colours.module.scss';

interface Props extends PropsWithChildren {
  // The title of the page
  title?: string;
}

/**
 *  The base layout template is used to wrap all pages with a consistent layout
 *  if a different template is required for a page, it should extend this template
 */
export const BaseLayout: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title ? title + ' | ' : ''}${config.appName}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="application-name" content={config.appName} />
        <meta name="apple-mobile-web-app-title" content={config.appName} />
        <meta name="description" content={config.appDescription} />
        <meta name="theme-color" content={colourvars.colPrimary} />
        <meta name="msapplication-TileColor" content={colourvars.colPrimary} />
      </Head>
      <a className={styles['skip-link']} href="#maincontent">
        Skip to main content
      </a>
      <div className={styles['base-layout']}>{children}</div>
    </>
  );
};

export default BaseLayout;


import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import {
  ToastProvider,
  ErrorBoundaryProvider
} from 'lib/providers';
import { Provider } from 'react-redux';
import Store from 'lib/services/store';
import { validateConfig } from 'lib/helpers';

import config from 'app-config';
import 'styles/index.scss';

export function App({ Component, pageProps }: AppProps) {
  validateConfig(config);

  const { store } = Store.useWrappedStore(pageProps);


  return (
    <Provider store={store}>
      <ThemeProvider>
          <ToastProvider>
            <ErrorBoundaryProvider>
                  <Component {...pageProps} />
            </ErrorBoundaryProvider>
          </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

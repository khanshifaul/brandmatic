'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './theme-provider';
import { makeStore } from '../store';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());
  const persistor = (store as any).__persistor;

  // Ensure hydration happens before rendering children
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isHydrated ? (
          <ThemeProvider>{children}</ThemeProvider>
        ) : (
          <div className="min-h-screen bg-background" />
        )}
      </PersistGate>
    </Provider>
  );
} 
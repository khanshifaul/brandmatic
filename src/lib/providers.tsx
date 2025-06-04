'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from './store';

const store = makeStore();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={(store as any).__persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
} 
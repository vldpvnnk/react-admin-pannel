'use client';

import { Provider } from 'react-redux';
import { initializeStore } from './store';
import { useMemo } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => initializeStore(), []); 
  return <Provider store={store}>{children}</Provider>;
}

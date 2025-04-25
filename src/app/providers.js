'use client';

import AppHeader from '@/components/AppHeader/AppHeader';
import { Content, Theme } from '@carbon/react';
import { ThemeProvider } from './contexts/ThemeContext';

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <div>
        <Theme theme="g100">
          <AppHeader/>
        </Theme>
        <Content>{children}</Content>
      </div>
    </ThemeProvider>
  );
}

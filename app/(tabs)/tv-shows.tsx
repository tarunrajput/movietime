import React from 'react';
import {ErrorBoundary} from '@/components';
import {Home} from '@/features/home';

export default function TVShowsScreen() {
  return (
    <ErrorBoundary>
      <Home type="tv" />
    </ErrorBoundary>
  );
}

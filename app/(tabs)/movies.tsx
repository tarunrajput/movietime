import React from 'react';
import {ErrorBoundary} from '@/components';
import {Home} from '@/features/home';

export default function MoviesScreen() {
  return (
    <ErrorBoundary>
      <Home type="movie" />
    </ErrorBoundary>
  );
}

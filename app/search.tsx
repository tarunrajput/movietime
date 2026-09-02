import React from 'react';
import {Screen} from '@/components/Screen';
import {ScreenHeader} from '@/components/ScreenHeader';
import {ErrorBoundary} from '@/components';
import {SearchBox} from '@/features/search/SearchBox';

/**
 * Omnibox search screen — single search bar that searches
 * movies, TV shows, and cast/crew simultaneously via TMDB's /search/multi.
 */
function SearchScreenContent() {
  return (
    <Screen>
      <ScreenHeader title="Search" />
      <SearchBox />
    </Screen>
  );
}

export default function SearchScreen() {
  return (
    <ErrorBoundary>
      <SearchScreenContent />
    </ErrorBoundary>
  );
}

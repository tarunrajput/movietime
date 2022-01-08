import React from 'react';
import { FlatList } from 'react-native';
import SearchResultItem from './SearchResultItem';

const SearchResults = ({ results = [], navigation, onReachEnd, type }) => {
    return (
        <FlatList 
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps={"handled"}
            data={results}
            contentContainerStyle={{ marginVertical: 8 }}
            onEndReached={onReachEnd}
            renderItem={({ item }) => <SearchResultItem data={item} navigation={navigation} type={type} />}
            onEndReachedThreshold={0.9}
        />
    );
}

export default SearchResults;
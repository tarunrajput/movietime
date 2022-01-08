import React from 'react';
import Screen from '@/Components/common/Screen';
import SearchHeader from '@/Components/Search/SearchHeader';
import SearchBox from '@/Components/Search/SearchBox';

const Search = (props) => {
    const { route, navigation } = props;
    return (
        <Screen>
            <SearchHeader navigation={navigation} route={route} />  
            <SearchBox navigation={navigation} />
        </Screen>
    );
}

export default Search;
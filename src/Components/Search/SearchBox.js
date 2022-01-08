import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Colors from '@/Constants/Colors';
import apiRequest from "@/config/apiRequest";
import SearchResults from './SearchResults';
import { debounce } from "@/utils/utils";

const SearchBox = ({ navigation }) => {
    const [searchResult, setSearchResult] = useState({});
    const debounceSearch = React.useCallback(debounce(searchTitle, 200), []);
    
    async function searchTitle (text) {
        const searchQueryOptions = {
            apiUrl: 'multiSearch',
            data: {
                query: text,
                include_adult: true,
            }
        }
        const searchResult = await apiRequest(searchQueryOptions);
        setSearchResult(searchResult);
    }

    return (
        <>
            <View style={SearchBoxStyles.searchBoxContainer}>
                <Icon name="search" size={20} style={{ margin: 12, color: Colors.black}} />
                <View style={{ alignSelf: "center", flex: 1 }}>
                    <TextInput
                        style={SearchBoxStyles.searchInput}
                        placeholder={'Find Movies, TV Shows, Actors...'}
                        placeholderTextColor={Colors.darkGray}
                        onChangeText={(text) => debounceSearch(text)}
                        returnKeyType={"search"}
                        autoCorrect={false}
                    />
                </View>
            </View>
            <SearchResults results={searchResult.results} navigation={navigation} />
        </>
    );
}

export default SearchBox;

const SearchBoxStyles = StyleSheet.create({
    searchBoxContainer: {
        backgroundColor: Colors.lightGray,
        marginHorizontal: 14,
        borderRadius: 10,
        flexDirection: 'row'
    },
    searchInput: {
        fontFamily: "Montserrat-Medium",
        fontSize: 14,
        flex: 1,
        marginRight: 12,
    },
})
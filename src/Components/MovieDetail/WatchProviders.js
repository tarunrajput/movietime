import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as RNLocalize from "react-native-localize";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "@/utils/utils";
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/Octicons';

const WatchProviders = ({ providers = {} }) => {
    const { results = {} } = providers;
    const country = RNLocalize.getCountry() || 'IN';
    const currentCountryProviders = results[country] || {};
    const flatRate = currentCountryProviders.flatrate || [];
    const rent = currentCountryProviders.rent || [];
    const _providers = [...flatRate, ...rent].slice(0,6);

    if(_providers.length === 0) return null;
    return (
        <View>
            <Text style={WatchProvidersStyles.watchProvidersTitle}><Icon name='broadcast' size={18} />{' '}Available On</Text>
            <View style={WatchProvidersStyles.watchProviders}>
                {_providers.map((item, index) => {
                    const logoURL = getImageUrl(item.logo_path, 'uri', 'w185');
                    return <View key={index} style={WatchProvidersStyles.watchProvidersImgWrapper}><FastImage style={[{ width: 45, height: 45 }]} source={logoURL} /></View>
                })}
            </View>
        </View>
    )
};

export default WatchProviders;

const WatchProvidersStyles = StyleSheet.create({
    watchProviders: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    watchProvidersImgWrapper: {
        paddingRight: 14,
    },
    watchProvidersTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        marginBottom: 8,
        marginTop: 24,
        color: Colors.black
    }
})
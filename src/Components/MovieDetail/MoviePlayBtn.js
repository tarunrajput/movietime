import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import Colors from '@/Constants/Colors';
import Modal from 'react-native-modal';

class MoviePlayBtn extends Component {
    state = {
        modalVisible: false,
    };

    toggleModal = () => {
        this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
    };

    onPressPlay = (key) => {
        this.toggleModal();
        this.props.navigation.navigate("Webview", { id: key });
    };

    render() {
        const { results = [] } = this.props.videos || {};
        const videos = results.slice(0, 7);
        const isModalShown = this.state.modalVisible && results.length ? true : false;
        return (
            <>
                <TouchableWithoutFeedback onPress={this.toggleModal}>
                    <View style={PlayBtnStyles.iconContainer}>
                        <Icon name="play" size={20} color={Colors.white} style={PlayBtnStyles.playIcon} />
                    </View>
                </TouchableWithoutFeedback>
                <Modal
                    isVisible={isModalShown}
                    style={{ justifyContent: "flex-end", margin: 0 }}
                    swipeDirection={['up', 'down']}
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    onSwipeComplete={this.toggleModal}
                >
                    <View style={PlayBtnStyles.modalStyle}>
                        <View style={PlayBtnStyles.bar} />
                        <Text style={PlayBtnStyles.videoText}>Videos</Text>
                        {videos.map(video => {
                            return <View key={video.key} style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}>{video.name}</Text>
                                    <Text style={{ fontFamily: "Montserrat-Light", fontSize: 12 }}>{video.type}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => this.onPressPlay(video.key)}>
                                    <View style={{ alignSelf: "flex-start", borderRadius: 6, overflow: "hidden" }}>
                                        <Text style={PlayBtnStyles.playText}>Play</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        })}
                    </View>
                </Modal>
            </>
        );
    }
}

export default MoviePlayBtn;

const PlayBtnStyles = StyleSheet.create({
    iconContainer: {
        position: "absolute",
        right: 0,
        top: -30,
        marginRight: 25,
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: "center",
    },
    playIcon: {
        alignSelf: 'center'
    },
    modalStyle: {
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 48,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    bar: {
        width: 40,
        height: 5,
        backgroundColor: Colors.primary,
        marginBottom: 24,
        borderRadius: 2,
        alignSelf: "center",
        marginTop: 8,
    },
    videoText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
        paddingBottom: 12,
    },
    playText: {
        fontFamily: "Montserrat-SemiBold",
        textAlign: "right",
        backgroundColor: Colors.primary,
        color: Colors.white,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 14,
    },
})
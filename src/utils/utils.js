import { IMAGE_URL } from '@/config/apiConfig';
import { Dimensions, PixelRatio, Platform } from "react-native";

export const getImageUrl = (path, key = "uri", width = "w500") => {
    return { [key]: `${IMAGE_URL}${width}${path}` };
};

export const normalizeFont = (size) => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const widthBaseScale = SCREEN_WIDTH / 320;
    const newSize = size * widthBaseScale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
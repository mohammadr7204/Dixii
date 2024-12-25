import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES, FONT } from "../constants";
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.secondary ,
        marginTop: Platform.OS === 'android' ? 24 : 0
    },
});

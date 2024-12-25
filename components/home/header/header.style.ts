import { StyleSheet, Platform } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 16 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    picContainer: {
        borderColor: COLORS.primary,
        borderRadius: 100,
        borderWidth: 2,
    },
    profile: {
        height: 60,
        width: 60,
        borderRadius: 100,
    },
    text: {
        marginLeft: 10,
    },
    greeting: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.white,
    },
    name: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.white,
    },
    noti: {
        height: 25,
        width: 25,
        marginHorizontal: 16,
    },
});

export default styles;
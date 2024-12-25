import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column'
    },
    headerText: {
        fontFamily: FONT.medium,
        fontSize: SIZES.xLarge,
        textAlign: 'left',
        color: COLORS.white,
        marginBottom: 16,
        marginTop: 8
    },
    profileContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: 'column',
    },
    topContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    pfp: {
        height: 60,
        width: 60,
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 100,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 12,
        marginHorizontal: 20,
        justifyContent: 'center', 
    },
    rightTextContainer: {
        flexDirection: 'column',
        marginLeft: 'auto',
        alignItems: 'flex-end',
        justifyContent: 'center', 
    },
    name: {
        fontSize: SIZES.large,
        color: COLORS.white,
        fontFamily: FONT.medium,
    },
    xpText: {
        fontSize: SIZES.xSmall,
        color: COLORS.white,
        fontFamily: FONT.regular
    },
    streakText: {
        color: COLORS.white,
        fontSize: SIZES.xSmall,
        fontFamily: FONT.regular,
        paddingBottom: 4,
        textAlign: 'right',
    },
    totalXp: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        textAlign: 'right',
    },
    bottomContainer: {
        padding: 12,
        flexDirection: 'row',
        backgroundColor: COLORS.tertiary,
        flex: 1,
        borderBottomRightRadius: 11,
        borderBottomLeftRadius: 11,
    },
    bottomText: {
        color: COLORS.white,
        flex: 3,
        fontSize: SIZES.xSmall,
    }
});

export default styles;

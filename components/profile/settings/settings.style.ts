import { StyleSheet, Platform, TouchableWithoutFeedbackComponent } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({ 
    editProfileButton: {
        backgroundColor: COLORS.tertiary,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        borderRadius: 12,
    },
    editProfileText: {
        color: COLORS.white,
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
    },
    settingsContainer: {
        marginTop: 20,
        backgroundColor: COLORS.tertiary,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        flex: 1,
    },
    iconContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        height: 24,
        width: 24,       
    },
    iconText: {
        marginTop: 5,
        color: COLORS.white,
        fontSize: SIZES.small,
        textAlign: 'center',
        fontFamily: FONT.light
    },
    signOutButton: {
        backgroundColor: COLORS.tertiary,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 12,
    },
    signOutText: {
        color: COLORS.red,
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
    }
})

export default styles;
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.tertiary,
        borderRadius: 40,
        flex: 1,
        elevation: 30,
        alignItems: 'center',
        marginTop: 0,
        marginVertical: 20,
    },
    textInput: {
        flex: 2,
        fontFamily: FONT.regular,
        marginLeft: 20  ,
        fontSize: SIZES.small,
        color: COLORS.gray2,
        marginBottom: 18,
        marginTop: 18,
    },
    emailLogo: {
        marginRight: 18,
        height: 18,
        width: 18,
    },
    signInContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    signInText: {
        fontFamily: FONT.semi,
        color: COLORS.white,
        fontSize: SIZES.large,
        textAlign: 'center',
        flex: 1,
        marginBottom: 18,
        marginTop: 18,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.tertiary,
        borderRadius: 40,
        elevation: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginVertical: 10,
    },
    brandLogo: {
        height: 30,
        width: 30,
        marginBottom: 18,
        marginTop: 18,
    },
    logoText: {
        fontFamily: FONT.semi,
        color: COLORS.white,
        fontSize: SIZES.small,
        //textAlign: 'center',
        marginLeft: 20
    }

})
export default styles;
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";
import { Color } from "aws-cdk-lib/aws-cloudwatch";

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
    signInContainer:{
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    signInText:{
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
    },
    passRequirements: {
        fontFamily: FONT.regular,
        color: COLORS.gray2,
        fontSize: SIZES.xSmall,
        marginHorizontal: 16,
    },
    dropdownContainer: {
        backgroundColor: COLORS.tertiary,
        padding: 0,
        borderRadius: 30,
        marginBottom: 20,
    },
    dropdown: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        color: COLORS.tertiary,
    },
    list: {
        backgroundColor: COLORS.tertiary,
        borderColor: COLORS.secondary,
        borderRadius: 30,
        padding: 5,
        marginTop: 5,
    },
    placeholderStyle: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray2,
    },
    selectedTextStyle: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray2,
    },
    inputSearchStyle: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray2,
        borderColor: COLORS.secondary,
        borderRadius: 30,
        paddingLeft: 8,
    },
    errorText:{
        marginHorizontal: 16,
        color: COLORS.red,
        fontSize: SIZES.xSmall,
        marginTop: 20,
        alignItems: 'flex-end',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 16,
    },
    termsText: {
        marginLeft: 10,
        color: COLORS.gray,
    },
    termsLink: {
        color: COLORS.primary,
        textDecorationLine: 'underline',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxTick: {
        width: 14,
        height: 14,
        backgroundColor: COLORS.primary,
    },
})
export default styles;
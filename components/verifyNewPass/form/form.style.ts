import {COLORS, FONT, SIZES, SHADOWS, icons, images} from '../../../constants';
import {StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.tertiary,
        borderRadius: 40,
        flex: 1,
        elevation: 30,
        alignItems: 'center',
        marginTop: 20,
        marginVertical: 20,
    },
    textInputPass: {
        flex: 2,
        fontFamily: FONT.regular,
        marginLeft: 20  ,
        fontSize: SIZES.small,
        color: COLORS.gray2,
        marginBottom: 18,
        marginTop: 18,
    },
    container : {
        marginTop: 32,
        flexDirection: 'row',
    },
    smallContainer : {
        marginHorizontal: 4,
        paddingVertical: 16,
        borderRadius: 100,
        backgroundColor: COLORS.tertiary,
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        fontFamily: FONT.semi,
        fontSize: SIZES.xxLarge,
        color: COLORS.white,
    },
    verifyContainer:{
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    verifyText:{
        fontFamily: FONT.semi,
        color: COLORS.white,
        fontSize: SIZES.large,
        textAlign: 'center',
        flex: 1,
        marginBottom: 18,
        marginTop: 18,
    },
    errorText:{
        marginHorizontal: 16,
        color: COLORS.red,
        fontSize: SIZES.xSmall,
        marginTop: 20,
        alignItems: 'flex-end',
    },

})
export default styles;
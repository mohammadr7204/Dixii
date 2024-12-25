import { time } from "console";
import { COLORS, SIZES, FONT } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    arrowLogo: {
        height: 32,
        width: 32,
        padding: 5,

    },
    logoContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    headerText: {
        fontFamily: 'Times',
        fontSize: SIZES.small,
        textAlign: 'center',
        color: COLORS.white,
        lineHeight: 20,
    },
    mainText: {
        textAlign: 'justify',
        fontFamily: 'Times',
        fontSize: SIZES.small,
        color: COLORS.white
    },
    boldText:{
        fontWeight: '900',
    },
    textContainer: {
        flexDirection: 'column',
        marginVertical: 12,
    },
})

export default styles;
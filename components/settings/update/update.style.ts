import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";
import { subtle } from "crypto";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiary,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",

    },
    icon: {
        height: 80,
        width: 80
    },
    mainText:{
        color: COLORS.white,
        fontFamily: FONT.semi,
        fontSize: SIZES.large,
        marginTop: 15,
    },
    subText: {
        color: COLORS.gray,
        fontFamily: FONT.light,
        fontSize: SIZES.small,
        marginTop: 15,
        textAlign: 'center'
    }
})
export default styles;
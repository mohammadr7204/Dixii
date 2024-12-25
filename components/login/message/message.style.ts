import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        backgroundColor: COLORS.secondary,
        marginBottom: 15,
    },
    mainText:{
        textAlign: "left",
        fontFamily: FONT.bold,
        fontSize: SIZES.xxxLarge,
        color: COLORS.white,
        lineHeight: 40,
    },
    secondaryText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
})
export default styles;
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 20,
        flex: 1,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    brainLogo: {
        height: 40,
        width: 40,
    },
    logoText : {
        paddingLeft: 5,
        fontFamily: FONT.regular,
        fontSize: SIZES.xxLarge,
        color: COLORS.white,
    }
})

export default styles;
import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    arrow: {
        height: 32,
        width: 32,
        padding: 5,
    },
    text: {
        marginLeft: 10,
        fontSize: SIZES.large,
        color: COLORS.white,
        fontFamily: FONT.semi,
    }
})
export default styles
import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 12,
        marginTop: 6,
        flexDirection: 'column',
        paddingTop: 32,
        paddingBottom: 32
    },
    statContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    stat: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 2,
        marginHorizontal: 5
    },
    percentContainer: {
        flexDirection: 'row',
    },
    icon: {
        height: 40,
        width: 40,
        marginTop: 6
    },
    percentage: {
        fontSize: SIZES.xxxxLarge,
        fontFamily: FONT.bold,
        color: COLORS.white,

    },
    statText: {
        fontSize: SIZES.small,
        color: COLORS.white,
        fontFamily: FONT.light,
        textAlign: 'left',
        paddingHorizontal: 32
    },
    timeContainer: {
        flexDirection: 'column',
        marginTop: 32
    },
    clockContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    clock: {
        height:50,
        width: 50,
        marginRight: 8,
    },
    clockText: {
        fontSize: SIZES.small,
        color: COLORS.white,
        fontFamily: FONT.light,
        textAlign: 'center',
    }
})
export default styles;
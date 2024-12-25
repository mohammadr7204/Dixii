import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray3,
    },
    secondaryContainer: {
        backgroundColor: COLORS.secondary,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 32,
        marginTop: 16,
    },
    icon: {
        margin: 0,
        width: 24,
        height: 24,
    },
    iconText: {
        marginTop: 4,
        textAlign: 'left',
        color: COLORS.gray2,
        fontSize: SIZES.xSmall,
        fontFamily: FONT.regular
    },
    eegLogo: {
        flex: 1,
        height: 64,
        width: 64,
        marginTop: -64,
    }
}
)

export default styles;
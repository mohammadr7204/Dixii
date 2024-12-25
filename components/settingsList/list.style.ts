import { COLORS, SIZES, FONT } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 12,
        flexDirection: 'row',
        backgroundColor: COLORS.gray5,
        marginTop: 12
    },
    container: {
        flexDirection: 'column'
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 10,
        marginVertical: 15,
        marginTop: 25,
        tintColor: COLORS.white
    },
    textContainer: {
        flexDirection:'column',
        marginVertical: 15,
        margin: 10,
        marginLeft: 15,
        flex: 2
    },
    mainText: {
        color:COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
        
    },
    subText: {
        color: COLORS.gray,
        fontSize: SIZES.xSmall,
        marginTop: 5,
        fontFamily: FONT.light, 
        lineHeight: 15
    },
    arrow: {
        height: 40,
        width: 40,
        tintColor: COLORS.white,
        flex: 1,
        marginTop: 20
    },
    switch: {
        marginVertical: 25
    },
    signOutButton: {
        backgroundColor: COLORS.tertiary,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 12,
    },
    signOutText: {
        color: COLORS.red,
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
    }, 
    slider: {
        width: 300,
        height: 40,
        alignSelf: 'center',
        marginTop: 10
      },

})
export default styles;
import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container : {
        marginTop: 50,
        flexDirection: 'column',
        
    },
    bigText: 
    {
        color: COLORS.white,
        fontFamily: FONT.bold,
        fontSize: SIZES.xxxLarge,
        
        lineHeight: 40,
    },
    smallText: {
        paddingTop: 12,
        fontFamily: FONT.regular,
        color: COLORS.gray,
        fontSize: SIZES.medium
    }
    
}
)
export default styles;
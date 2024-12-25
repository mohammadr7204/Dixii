import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'column',
        marginTop: 5
    },
    itemContainer: {
        
        borderRadius: 8,
        //borderWidth: 1,
        margin: 12,
        flexDirection: 'row',
        marginTop: 2
         
        
    },
    logo: {
        height: 20, width: 20,
        tintColor: COLORS.white,marginTop: 5
    },
    mainText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
        
    },
    subText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        marginLeft: 10,
        marginTop: 5,
        flex: 15,
        
    },
    arrow: {
        height: 25,
        width: 25,
        tintColor: COLORS.white,
        flex: 2,    
        alignSelf: 'flex-end',
        

    }
})
export default styles;
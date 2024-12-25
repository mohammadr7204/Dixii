import { StyleSheet, Platform } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    flexDirection: "column",
    marginTop: -140,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dashboardHeader: {
    margin: 16,
    color: COLORS.white,
    fontFamily: FONT.semi,
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
  dashboardSubContainer: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dashboardGraphContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20,
    alignItems: 'center'
  },
  pie: {
    height: 88,
    width: 150,
    marginTop: 12,
  },
  textContainer: {
    flexDirection: "row",
  },
  labelText: {
    color: COLORS.white,
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
  },
  dashboardTextContainer: {
    flexDirection: "column",
    padding: 8,
    marginRight: 16,
  },
  textHeader: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.semi,
    textAlign: "center",
  },
  labelContainer: {
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
    alignContent: 'center',
    
  },
  descriptionText: {
    //color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.semi,
    padding: 10,   
    textAlign: "center"
  },
  vector: {
    position: "absolute",
    marginBottom: 0,
    marginTop: 0,
    //transform:[{rotate: '30deg'}],
    height: 48,
  },
  updateText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginLeft: 20,
    marginBottom: 20,
  },
});
export default styles;

import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  labelText: {
    color: COLORS.white,
    fontFamily: FONT.semi,
    fontSize: SIZES.xLarge,
    textAlign: "left",
  },
  barContainer: {
    flexDirection: "row",
    padding: 2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    marginTop: 16,
    flex: 1,
  },
  switch: {
    backgroundColor: COLORS.gray4,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  alternateSwitch: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    marginLeft: 0,
    fontSize: SIZES.small,
    color: COLORS.white,
    fontFamily: FONT.semi,
    marginVertical: 10,
  },
  alternateText: {
    textAlign: "center",
    marginLeft: 0,
    fontSize: SIZES.small,
    color: COLORS.white,
    fontFamily: FONT.regular,
    marginVertical: 10,
  },
});
export default styles;

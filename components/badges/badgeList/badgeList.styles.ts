import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 0,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
  },
  badgeContainer: {
    flexDirection: "column",
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
  icon: {
    height: 150,
    width: 150,
    alignItems: "center",
  },
  header: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  text: {
    marginTop: 5,
    color: COLORS.white,
    fontFamily: FONT.light,
    fontSize: SIZES.xSmall,
    textAlign: "center",
  },
});
export default styles;

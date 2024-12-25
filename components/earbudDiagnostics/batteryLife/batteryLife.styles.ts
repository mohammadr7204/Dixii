import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  header: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  batteryLevel: {
    width: 50,
    height: 25,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  batteryText: {
    marginLeft: 5,
    fontSize: SIZES.small,
    fontWeight: "bold",
    fontFamily: FONT.semi,
    color: COLORS.white,
    position: "absolute",

  },
  earbudsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  earbud: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 8,
  },
  earbudImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

export default styles;

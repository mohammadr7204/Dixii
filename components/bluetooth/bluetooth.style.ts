import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: Dimensions.get("window").width - 32,
    padding: 20,
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontFamily: FONT.medium,
    color: COLORS.white,
    fontSize: SIZES.large,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 64,
    paddingVertical: 12,
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: FONT.medium,
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  earbudsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  earbud: {
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

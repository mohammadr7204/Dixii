import { COLORS, SIZES, FONT } from "../../constants";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flex: 1,
  },
  arrow: {
    height: 32,
    width: 32,
    padding: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: SIZES.large,
    color: COLORS.white,
    fontFamily: FONT.semi,
  },
  pfpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  pfp: {
    margin: 16,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  editPicButton: {
    backgroundColor: COLORS.gray3,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editPicText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    flexDirection: "column",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    marginVertical: 8,
  },
  fieldText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    minWidth: 100,
  },
  textInput: {
    flex: 1,
    fontFamily: FONT.regular,
    marginLeft: 20,
    fontSize: SIZES.medium,
    color: COLORS.gray2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    paddingBottom: 4,
  },
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  submitButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText:{
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  }
});

export default styles;

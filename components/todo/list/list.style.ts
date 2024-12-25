import { COLORS, SIZES, FONT } from "../../../constants";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: "column",
  },
  barContainer: {
    flexDirection: "row",
    padding: 8,
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
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.semi,
    marginVertical: 10,
  },
  alternateText: {
    textAlign: "center",
    marginLeft: 0,
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.regular,
    marginVertical: 10,
  },
  addContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: 24,
    padding: 12,
  },
  addTodoText: {
    flex: 1,
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.semi,
    marginLeft: 16,
  },
  todoText: {
    flex: 1,
    color: COLORS.white,
    fontSize: SIZES.medium, // Ensure text doesn't split or overflow
    fontFamily: FONT.semi,
    marginLeft: 16,
    flexShrink: 1, // Allows the text to shrink if needed
  },
  logo: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  trashIcon: {
    height: 20,
    marginRight: -16,
  },
  todoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
  },
  todoItemText: {
    flex: 1,
    textAlign: "center",
    color: COLORS.white,
  },
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
    padding: 8,
  },
  listItemSeparator: { height: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.primary,
  },
  dateText: {
    color: COLORS.gray2,
    marginLeft: 52,
    marginBottom: 16,
    marginTop: 8,
  },
  addTaskModal: {
    backgroundColor: COLORS.tertiary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: Dimensions.get("window").width - 32,
    marginTop: -160
  },
  modalContainer: {
    backgroundColor: COLORS.tertiary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: Dimensions.get("window").width - 32,
    height: "80%",
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semi,
    color: COLORS.white,
    marginBottom: 24,
  },
  modalInput: {
    borderColor: COLORS.gray4,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 16,
    paddingVertical: 16
  },
  calendarButton: {
    backgroundColor: COLORS.gray3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  calendarButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  calendarContainer: {
    width: "100%",
    height: 350,
  },
  calendar: {
    borderRadius: 10,
    padding: 10,
  },
  dateContainer: {
    width: '100%',
    flexDirection: "row",
    marginBottom: 16,
  },
  timeRangeContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    alignItems: 'center',
  },
  timeTextContainer: {
    backgroundColor: COLORS.gray3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  timeText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addTaskButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
    marginRight: 8,
    flex: 1,
    alignItems: "center",
  },
  modalButtonText: {
    color: COLORS.white,
    fontFamily: FONT.semi,
    fontSize: SIZES.medium,
  },
  modalTaskContainer: {
    width: Dimensions.get("window").width - 64,
  },
  subtasktextContainer: {
    backgroundColor: COLORS.gray3,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    marginLeft: 40, // Indent subtasks to distinguish them from main tasks
    flexDirection: "row",
    alignItems: "center",
  },
  addsubtaskinputContainer: {
    flex: 1,
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginLeft: 4,
  },
  addSubtaskContainer: {
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  addSubtaskText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.semi,
    marginLeft: 8,
  },
  addSubtaskContainerActive: {
    backgroundColor: COLORS.primary, // Changing background color when active
    borderColor: COLORS.secondary, // Example of active border color
  },
  subtaskItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.gray3, // Different background for subtasks
    borderRadius: 8,
    marginLeft: 40, // Indentation for subtasks
    marginBottom: 4, // Spacing between subtasks
  },
  subtaskListContainer: {
    paddingBottom: 16, // Padding to ensure spacing at the bottom of the list
  },
});

export default styles;

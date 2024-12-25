// components/notifications/stressed/stressed.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  spacer: {
    width: 20,
    height: 20,
    marginRight: 1
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: COLORS.gray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
});

export default styles;

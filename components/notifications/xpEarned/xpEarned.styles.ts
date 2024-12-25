// components/notifications/xpEarned/xpEarned.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  time: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
  },
});

export default styles;

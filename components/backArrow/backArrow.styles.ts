import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT } from '../../constants';

const styles = StyleSheet.create({
  arrowLogo: {
    height: 32,
    width: 32,
    padding: 5,
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: SIZES.large,
    fontFamily: FONT.semi,
    color: COLORS.white,
    paddingLeft: 10,
    marginTop: 10,
  },
});

export default styles;

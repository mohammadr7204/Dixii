const COLORS = {
  primary: "#306FBA",
  secondary: "#0a0a0a",
  tertiary: "#121212",

  gray: "#616161",
  gray2: "#808080",
  gray3: "#212121",
  gray4: "#424242",
  gray5: "#121212",

  white: "#F0F0F0",
  lightWhite: "#FAFAFC",

  green: "#2DC672",
  red: "#FF1B1C",
  yellow: "#FFE07C"
};

const FONT = {
  light: "PoppinsLight",
  regular: "PoppinsRegular",
  medium: "PoppinsMedium",
  semi: "PoppinsSemi",
  bold: "PoppinsBold"
};

const SIZES = {
  xxxSmall: 8,  
  xxSmall: 10,
  xSmall: 12,
  small: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 28,
  xxxLarge: 32,
  xxxxLarge: 40
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
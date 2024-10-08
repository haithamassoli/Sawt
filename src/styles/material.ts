// https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors

import { hs, ms, vs } from "@utils/platform";

export const MaterialLight = {
  primary: "rgb(0, 107, 85)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(127, 248, 211)",
  onPrimaryContainer: "rgb(0, 33, 24)",
  secondary: "rgb(75, 99, 90)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(206, 233, 221)",
  onSecondaryContainer: "rgb(7, 32, 25)",
  tertiary: "rgb(64, 99, 118)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(196, 231, 255)",
  onTertiaryContainer: "rgb(0, 30, 44)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(251, 253, 250)",
  onBackground: "rgb(25, 28, 27)",
  surface: "rgb(251, 253, 250)",
  onSurface: "rgb(25, 28, 27)",
  surfaceVariant: "rgb(219, 229, 223)",
  onSurfaceVariant: "rgb(63, 73, 69)",
  outline: "rgb(111, 121, 116)",
  outlineVariant: "rgb(191, 201, 195)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(46, 49, 47)",
  inverseOnSurface: "rgb(239, 241, 238)",
  inversePrimary: "rgb(97, 219, 184)",
  elevation: {
    level0: "transparent",
    level1: "rgb(238, 246, 242)",
    level2: "rgb(231, 241, 237)",
    level3: "rgb(223, 237, 232)",
    level4: "rgb(221, 236, 230)",
    level5: "rgb(216, 233, 227)",
  },
  surfaceDisabled: "rgba(25, 28, 27, 0.12)",
  onSurfaceDisabled: "rgba(25, 28, 27, 0.38)",
  backdrop: "rgba(41, 50, 47, 0.4)",
};

export const MaterialDark = {
  primary: "rgb(128, 217, 151)",
  onPrimary: "rgb(0, 57, 26)",
  primaryContainer: "rgb(0, 82, 40)",
  onPrimaryContainer: "rgb(155, 246, 178)",
  secondary: "rgb(130, 217, 150)",
  onSecondary: "rgb(0, 57, 25)",
  secondaryContainer: "rgb(0, 82, 38)",
  onSecondaryContainer: "rgb(157, 246, 176)",
  tertiary: "rgb(82, 215, 239)",
  onTertiary: "rgb(0, 54, 62)",
  tertiaryContainer: "rgb(0, 78, 90)",
  onTertiaryContainer: "rgb(162, 238, 255)",
  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 180, 171)",
  background: "rgb(25, 28, 25)",
  onBackground: "rgb(226, 227, 222)",
  surface: "rgb(25, 28, 25)",
  onSurface: "rgb(226, 227, 222)",
  surfaceVariant: "rgb(65, 73, 65)",
  onSurfaceVariant: "rgb(193, 201, 191)",
  outline: "rgb(139, 147, 138)",
  outlineVariant: "rgb(65, 73, 65)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(226, 227, 222)",
  inverseOnSurface: "rgb(46, 49, 46)",
  inversePrimary: "rgb(0, 109, 55)",
  elevation: {
    level0: "transparent",
    level1: "rgb(30, 37, 31)",
    level2: "rgb(33, 43, 35)",
    level3: "rgb(36, 49, 39)",
    level4: "rgb(37, 51, 40)",
    level5: "rgb(39, 55, 43)",
  },
  surfaceDisabled: "rgba(226, 227, 222, 0.12)",
  onSurfaceDisabled: "rgba(226, 227, 222, 0.38)",
  backdrop: "rgba(43, 50, 43, 0.4)",
};

export const fontConfig = {
  DisplayLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(70),
    fontSize: ms(57),
  },
  DisplayMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(58),
    fontSize: ms(45),
  },
  DisplaySmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(50),
    fontSize: ms(36),
  },
  headlineLarge: {
    fontFamily: "CairoReg",
    lineHeight: vs(46),
    fontSize: ms(32),
  },
  headlineMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(42),
    fontSize: ms(28),
  },
  headlineSmall: {
    fontFamily: "CairoBold",
    lineHeight: vs(38),
    fontSize: ms(24),
  },
  titleLarge: {
    fontFamily: "CairoReg",
    lineHeight: vs(34),
    fontSize: ms(22),
  },
  titleMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(30),
    fontSize: ms(16),
    letterSpacing: hs(0.15),
  },
  titleSmall: {
    fontFamily: "CairoBold",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.1),
  },
  labelLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.1),
  },
  labelMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(12),
    letterSpacing: hs(0.5),
  },
  labelSmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(11),
    letterSpacing: hs(0.5),
  },
  bodyLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(30),
    fontSize: ms(16),
    letterSpacing: hs(0.15),
  },
  bodyMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.25),
  },
  bodySmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(12),
    letterSpacing: hs(0.4),
  },
};

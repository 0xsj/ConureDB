export const textVariants = {
  defaults: {},
  headlineLargeBold: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    fontWeight: "",
  },
  headlineMediumBold: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
    fontWeight: "",
  },
  headlineSmallBold: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
    fontWeight: "",
  },
  emphasizedBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "",
  },
  bodyBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "",
  },
  smallBold: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "",
  },
  subBold: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "",
  },
  headlineLargeMD: {},
  headlineMediumMD: {},
  headlineSmallMD: {},
  headlineEmphasizedMD: {},
};

export type TextVariant = keyof typeof textVariants;

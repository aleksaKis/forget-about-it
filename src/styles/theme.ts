export const lightTheme = {
  theme: "light",
  primary: "#124559",
  primaryHover: "#74a9bb",
  secondary: "#01161E",
  detail: "#598392",
  backgroundColor: "#f4f4f4",
  backgroundAlt: "#cad7df",
  homeBackgroundColor: "#f2f2f2",
  textColor: "#343434",
  textColorAlt: "#828282",
  border: "#b1bbc7",
};

export const darkTheme: CustomTheme = {
  theme: "dark",
  primary: "#FFE66D",
  primaryHover: "#fce392",
  secondary: "#6DA6FF",
  detail: "#f3ebc0",
  backgroundColor: "#343434",
  backgroundAlt: "#282828",
  homeBackgroundColor: "#202020",
  textColor: "#F7FFF7",
  textColorAlt: "#828282",
  border: "#505050",
};

export type CustomTheme = typeof lightTheme;

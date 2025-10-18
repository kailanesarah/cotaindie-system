import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Inter Tight",
  fonts: [
    { src: "/fonts/inter-tight-regular.ttf", fontWeight: "normal" },
    { src: "/fonts/inter-tight-bold.ttf", fontWeight: "bold" },
  ],
});

export const styles = StyleSheet.create({
  page: {
    fontSize: 9,
    fontFamily: "Inter Tight",
    backgroundColor: "#fff",
    color: "#000",
    paddingTop: 85,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  pageContent: {},
  fixedHeader: {
    position: "absolute",
    top: 40,
    left: 40,
    right: 40,
  },
  fixedFooter: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
});

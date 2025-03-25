import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/Fonts/Roboto-Regular.ttf" }, // Regular (400)
    { src: "/Fonts/Roboto-Bold.ttf", fontWeight: "bold" }, // Bold (700)
    { src: "/Fonts/Roboto-SemiBold.ttf", fontWeight: 600 }, // SemiBold (600)
    { src: "/Fonts/Roboto-Light.ttf", fontWeight: 300 }, // Light (300)
    { src: "/Fonts/Roboto-Medium.ttf", fontWeight: 500 }, // Medium (500)
  ],
});

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: "5%", // Relative padding (5% of A4 width/height)
    fontFamily: "Roboto",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    borderRadius: 5,
    position: "relative",
    flex: 1, // Allow container to grow and fill available space
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#052e16", // Consistent with your branding
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 2,
    opacity: 0.9,
  },
  divider: {
    borderBottom: "1px solid #c4c4c4",
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    flexWrap: "wrap", // Allow wrapping on smaller pages if needed
  },
  infoLeft: {
    width: "60%", // Flexible width
    minWidth: 200, // Minimum width for smaller layouts
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "10px",
  },
  infoRight: {
    width: "38%", // Flexible width
    minWidth: 150, // Minimum width for smaller layouts
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "5px",
    alignItems: "center", // Center content for flexibility
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align left for readability
    marginBottom: 5,
    width: "100%", // Ensure full width usage
  },
  infoLabel: {
    flex: 2, // Adjusted for more flexibility (was 6)
    fontSize: 11,
    fontWeight: 600,
    minWidth: 70, // Minimum width for labels
  },
  infoValue: {
    flex: 3, // Adjusted for more flexibility (was 6)
    fontSize: 11,
    fontWeight: 400,
  },
  table: {
    width: "100%",
    marginTop: 8,
    border: "1px solid #a6a4a4",
    borderBottom: "none",
    borderRadius: "5px",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#bfbfbf",
    fontSize: 11,
    fontWeight: "bold",
    borderBottom: "1px solid #a19f9f",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #a19f9f",
    fontSize: 11,
  },
  tableCell: {
    padding: 5,
    textAlign: "center", // Center text for consistency
  },
  tableCellSubject: {
    flex: 2, // Wider column for Subject Name
    padding: 5,
    textAlign: "left", // Left-align for readability
  },
  tableCellOther: {
    flex: 1, // Narrower columns for Marks, GPA, Letter Grade
    padding: 5,
    textAlign: "center",
  },
  footer: {
    width: "95%",
    margin: "0 auto",
    padding: "20px",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 10,
    borderBottom: "1px solid #757575",
  },
  signature: {
    fontSize: 12,
    fontWeight: 500,
    borderTop: "1px solid #000",
    paddingTop: 5,
  },
});
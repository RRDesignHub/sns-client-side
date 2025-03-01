 // Styles

import { Font, StyleSheet } from "@react-pdf/renderer";


    Font.register({
      family: 'Roboto',
    fonts: [
      { src: '/Fonts/Roboto-Regular.ttf' }, // Regular (400)
      { src: '/Fonts/Roboto-Bold.ttf', fontWeight: 'bold' }, // Bold (700)
      { src: '/Fonts/Roboto-SemiBold.ttf', fontWeight: 600 }, // SemiBold (600)
      { src: '/Fonts/Roboto-Light.ttf', fontWeight: 300 }, // Light (300)
      { src: '/Fonts/Roboto-Medium.ttf', fontWeight: 500 }, // Medium (500)
      { src: '/Fonts/Roboto-Regular.ttf', fontWeight: 400 }, // Medium (500)
    ],
    });

export const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 20,
      fontFamily: "Roboto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      borderRadius: 5,
      position: "relative"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    divider: {
      borderBottom: "1px solid #c4c4c4",
      marginVertical: 10,
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      rowGap: "30px",
      paddingVertical: 4,
    },
    infoLeft: {
      width: "60%",
      border: "1px solid #c4c4c4",
      borderRadius: "5px",
      padding: "5px",
    },
    infoRight: {
      width: "38%",
      border: "1px solid #c4c4c4",
      borderRadius: "5px",
      padding: "5px",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 5,
    },
    infoLabel: {
      flex: 6,
      fontSize: 12,
      fontWeight: "bold",
    },
    infoValue: {
      flex: 6,
      fontSize: 12,
    },
    table: {
      width: "100%",
      marginTop: 10,
      border: "1px solid #a6a4a4",
      borderBottom: "none",
      borderRadius: "5px",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#a6a4a4",
      fontSize: 12,
      fontWeight: "bold",
      borderBottom: "1px solid #a19f9f",
      padding: 5,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #a19f9f",
      fontSize: 12,
    },
    tableCell: {
      padding: 5,
      flex: 1,
    },
  });
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 5,
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
  rowData: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  cell: {
    flex: 1,
  },
});

export interface EmployeeReportData {
  employeeId: string;
  date: string;
  email: string;
  signIn: string;
  signOut: string;
}

function EmployeeAttendanceAndSalaryReport({
  data,
}: {
  data: EmployeeReportData[];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Employee Report</Text>
          <View style={styles.headerRow}>
            <Text style={styles.columnHeader}>Employee ID</Text>
            <Text style={styles.columnHeader}>Date</Text>
            <Text style={styles.columnHeader}>Sign In</Text>
            <Text style={styles.columnHeader}>Sign Out</Text>
          </View>
          {data.map((employee: any, index: any) => (
            <View key={index} style={styles.rowData}>
              <Text style={styles.cell}>{employee.employeeId}</Text>
              <Text style={styles.cell}>{employee.date}</Text>
              <Text style={styles.cell}>{employee.signIn}</Text>
              <Text style={styles.cell}>{employee.signOut}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default function GenerateReportButton({
  data,
}: {
  data: EmployeeReportData[];
}) {
  return (
    <PDFDownloadLink
      document={<EmployeeAttendanceAndSalaryReport data={data} />}
      fileName="attendance_and_salary_report.pdf"
      className="bg-primary text-black px-4 py-2 rounded font-bold "
    >
      {({ loading }) =>
        loading ? "Generating PDF..." : "Generate Attendance Report"
      }
    </PDFDownloadLink>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';

interface Registration {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  attendees: number | '';
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  registration: {
    marginBottom: 10,
  },
  registrationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  registrationDetail: {
    marginLeft: 10,
  },
});

const RegistrationReport: React.FC<{ registrations: Registration[] }> = ({ registrations }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Registration Report</Text>
      {registrations.map((registration, index) => (
        <View key={index} style={styles.registration}>
          <Text style={styles.registrationTitle}>Registration #{index + 1}:</Text>
          <Text style={styles.registrationDetail}>Name: {registration.name}</Text>
          <Text style={styles.registrationDetail}>Email: {registration.email}</Text>
          <Text style={styles.registrationDetail}>Mobile: {registration.mobile}</Text>
          <Text style={styles.registrationDetail}>Attendees: {registration.attendees}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const RegistrationReportPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Fetch all registrations
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get<Registration[]>('http://localhost:5000/api/reg/');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to fetch registrations');
    }
  };

  // Fetch registrations when the component mounts
  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Registration Report</h1>

        {/* Download link for the PDF report */}
        <PDFDownloadLink
          document={<RegistrationReport registrations={registrations} />}
          fileName="registration_report.pdf"
          className="bg-primaryAccent text-white px-4 py-2 rounded-lg"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report as PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default RegistrationReportPage;

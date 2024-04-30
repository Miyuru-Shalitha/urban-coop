import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Booking } from './type'; // Import the Booking type

// StyleSheet for the PDF report
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
    booking: {
        marginBottom: 10,
    },
    bookingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    bookingDetail: {
        marginLeft: 10,
    },
});

// Create the PDF report component
const MyBookingsReport: React.FC<{ bookings: Booking[] }> = ({ bookings }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>Urban Coop Pet Daycare Bookinsg</Text>
            {bookings.map((booking, index) => (
                <View key={index} style={styles.booking}>
                    <Text style={styles.bookingTitle}>Booking #{index + 1}:</Text>
                    <Text style={styles.bookingDetail}>Customer Name: {booking.customerName}</Text>
                    <Text style={styles.bookingDetail}>Email: {booking.email}</Text>
                    <Text style={styles.bookingDetail}>Contact Number: {booking.contactNumber}</Text>
                    <Text style={styles.bookingDetail}>Start Date: {booking.startDate}</Text>
                    <Text style={styles.bookingDetail}>End Date: {booking.endDate}</Text>
                    <Text style={styles.bookingDetail}>Pet Name: {booking.petName}</Text>
                    <Text style={styles.bookingDetail}>Pet Type: {booking.petType}</Text>
                    <Text style={styles.bookingDetail}>Description: {booking.description}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

// Create the GenerateReportButton component
const GenerateReportButton: React.FC<{ bookings: Booking[] }> = ({ bookings }) => (
    <PDFDownloadLink
        document={<MyBookingsReport bookings={bookings} />}
        fileName="my_bookings_report.pdf"
        className="bg-primaryAccent text-black px-4 py-2 rounded font-bold "
    >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Generate Report')}
    </PDFDownloadLink>
);

export default GenerateReportButton;

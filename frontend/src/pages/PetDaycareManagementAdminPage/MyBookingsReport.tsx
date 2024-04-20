import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';
import { Booking } from './type'; 

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

const MyBookingsReport: React.FC<{ bookings: Booking[] }> = ({ bookings }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>My Bookings Report</Text>
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

const MyBookingsPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Fetch all bookings
    const fetchBookings = async () => {
        try {
            const response = await axios.get<Booking[]>('http://localhost:5000/api/bookings/');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to fetch bookings');
        }
    };

    // Fetch bookings when the component mounts
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

                {/* Download link for the PDF report */}
                <PDFDownloadLink
                    document={<MyBookingsReport bookings={bookings} />}
                    fileName="my_bookings_report.pdf"
                    className="bg-primaryAccent text-white px-4 py-2 rounded-lg"
                >
                    {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report as PDF')}
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default MyBookingsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipation: string;
  description: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase', // Convert title to uppercase
  },
  event: {
    marginBottom: 20,
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Darken title color
  },
  eventDetail: {
    marginLeft: 10,
    marginBottom: 5,
    color: '#666', // Dim detail color
  },
});

const EventReport: React.FC<{ events: Event[] }> = ({ events }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Event Report</Text>
      {events.map((event, index) => (
        <View key={index} style={styles.event}>
          <Text style={styles.eventTitle}>Event :{index + 1}:</Text>
          <Text style={styles.eventDetail}>Title: {event.title}</Text>
          <Text style={styles.eventDetail}>Date: {event.date}</Text>
          <Text style={styles.eventDetail}>Time: {event.time}</Text>
          <Text style={styles.eventDetail}>Location: {event.location}</Text>
          <Text style={styles.eventDetail}>Max Participation: {event.maxParticipation}</Text>
          <Text style={styles.eventDetail}>Description: {event.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const EventReportPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get<Event[]>('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Event Report</h1>

        {/* Download link for the PDF report */}
        <PDFDownloadLink
          document={<EventReport events={events} />}
          fileName="event_report.pdf"
          className="bg-primaryAccent text-white px-4 py-2 rounded-lg block w-full text-center"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report as PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default EventReportPage;

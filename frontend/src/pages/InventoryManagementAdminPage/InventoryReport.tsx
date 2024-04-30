/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

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
  item: {
    marginBottom: 10,
  },
  itemDetail: {
    marginLeft: 10,
  },
});

const InventoryReport: React.FC<{ items: any[] }> = ({ items }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Inventory Report</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>Item #{index + 1}:</Text>
          <Text style={styles.itemDetail}>Item Code: {item.itemCode}</Text>
          <Text style={styles.itemDetail}>Item Name: {item.itemName}</Text>
          <Text style={styles.itemDetail}>Item Brand: {item.itemBrand}</Text>
          <Text style={styles.itemDetail}>Category: {item.category}</Text>
          <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const generateReport = () => {
    // Logic to generate the report
    console.log('Generating inventory report...');
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
 );

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div>
        <PDFDownloadLink
          document={<InventoryReport items={filteredItems} />}
          fileName="inventory_report.pdf"
          className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 text-lg border-2 border-green-500 transition duration-300 ease-in-out"
          style={{ textDecoration: "none" }}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Inventory Report")}
        </PDFDownloadLink>
      </div>
    </div>
  );
  
};

export default InventoryManagement;*/

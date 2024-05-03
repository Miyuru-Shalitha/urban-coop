import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define types
interface Item {
  itemCode: string;
  itemName: string;
  itemBrand: string;
  category: string; // Assuming this is the category property
  quantity: number; // Assuming this is the quantity property
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
  item: {
    marginBottom: 10,
  },
  itemDetail: {
    marginLeft: 10,
  },
});

const InventoryReport: React.FC<{ items: Item[] }> = ({ items }) => (
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
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response: AxiosResponse<Item[]> = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
        // Handle error: You might want to set an error state to display a message to the user
      }
    };
    fetchItems();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    // Logic to generate the report
    console.log('Generating inventory report...');
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div>
        <input

        />
        <PDFDownloadLink
          document={<InventoryReport items={filteredItems} />}
          fileName="inventory_report.pdf"
          className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg
          hover:bg-green-600 text-lg border-2 border-green-500 transition duration-300 ease-in-out"
          style={{ textDecoration: "none" }}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Inventory Report")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InventoryManagement;

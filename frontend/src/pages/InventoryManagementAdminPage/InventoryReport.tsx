import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define types
interface Item {
  itemCode: string;
  itemName: string;
  itemBrand: string;
  category: string;
  quantity: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  item: {
    marginBottom: 10,
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 5,
  },
  itemDetail: {
    marginTop: 5,
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


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response: AxiosResponse<Item[]> = await axios.get(
          "http://localhost:5000/api/items"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
     
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div>

        <input />

        <input

        />

        <PDFDownloadLink
          document={<InventoryReport items={items} />}
          fileName="inventory_report.pdf"
          className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg
          hover:bg-green-600 text-lg border-2 border-green-500 transition duration-300 ease-in-out"
          style={{ textDecoration: "none" }}
        >
          {({ loading }) =>
            loading ? "Generating PDF..." : "Download Inventory Report"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InventoryManagement;

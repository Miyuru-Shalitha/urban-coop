import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

interface Supplier {
    supplierId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    category: string;
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
        fontWeight: 'bold',
        textAlign: 'center',
        textDecoration: 'underline',
    },
    supplier: {
        marginBottom: 10,
        border: '1px solid #ccc',
        padding: 10,
        borderRadius: 5,
    },
    supplierDetail: {
        marginTop: 5,
    },
});


const SupplierReport: React.FC<{ suppliers: Supplier[] }> = ({ suppliers }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>Urban Coop</Text>
            <Text style={styles.title}>Supplier Report</Text>
            {suppliers.map((supplier, index) => (
                <View key={index} style={styles.supplier}>
                    <Text>Supplier #{index + 1}:</Text>
                    <Text style={styles.supplierDetail}>ID: {supplier.supplierId}</Text>
                    <Text style={styles.supplierDetail}>Name: {supplier.name}</Text>
                    <Text style={styles.supplierDetail}>Phone Number: {supplier.phoneNumber}</Text>
                    <Text style={styles.supplierDetail}>Email: {supplier.email}</Text>
                    <Text style={styles.supplierDetail}>Address: {supplier.address}</Text>
                    <Text style={styles.supplierDetail}>Supplied Item Category: {supplier.category}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

const SupplierManagement: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response: AxiosResponse<Supplier[]> = await axios.get('http://localhost:5000/api/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers', error);
            }
        };
        fetchSuppliers();
    }, []);

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <PDFDownloadLink
                document={<SupplierReport suppliers={suppliers} />}
                fileName="supplier_management_report.pdf"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg
                text-lg border-2 transition duration-300 ease-in-out mt-4"
                style={{ textDecoration: "none" }}
            >
                {({ loading }) => (loading ? "Generating PDF..." : "Download Supplier Management Report")}
            </PDFDownloadLink>
        </div>
    );
};

export default SupplierManagement;
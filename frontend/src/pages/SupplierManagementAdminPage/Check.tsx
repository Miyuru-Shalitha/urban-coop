import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

interface Supplier {
    supplierId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    category: string;
}

export default function AllSupplierDetails() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);


    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = () => {
        axios.get("http://localhost:5000/api/suppliers/get")
            .then((res) => {
                setSuppliers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDelete = (supplierId: string) => {
        axios.delete(`http://localhost:5000/api/suppliers/delete/${supplierId}`)
            .then(() => {
                fetchSuppliers(); // Refresh supplier list after deletion
            })
            .catch((err) => {
                alert(err.response.data.error); // Display error message from server
            });
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    const PDFDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {suppliers.map((supplier) => (
                        <View key={supplier.supplierId}>
                            <Text>Supplier ID: {supplier.supplierId}</Text>
                            <Text>Name: {supplier.name}</Text>
                            <Text>Phone Number: {supplier.phoneNumber}</Text>
                            <Text>Email: {supplier.email}</Text>
                            <Text>Address: {supplier.address}</Text>
                            <Text>Category: {supplier.category}</Text>
                            <Text>-------------------------------</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">All Supplier Details</h2>
            {(
                <div className="mb-4">
                    <PDFDownloadLink document={<PDFDocument />} fileName="supplier_details.pdf">
                        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                    </PDFDownloadLink>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Supplier ID</th>
                            <th className="px-4 py-2">Supplier Name</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Actions</th> {/* Add Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier.supplierId}>
                                <td className="border px-4 py-2">{supplier.supplierId}</td>
                                <td className="border px-4 py-2">{supplier.name}</td>
                                <td className="border px-4 py-2">{supplier.phoneNumber}</td>
                                <td className="border px-4 py-2">{supplier.email}</td>
                                <td className="border px-4 py-2">{supplier.address}</td>
                                <td className="border px-4 py-2">{supplier.category}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleDelete(supplier.supplierId)}>Delete</button>
                                </td> {/* Delete button */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

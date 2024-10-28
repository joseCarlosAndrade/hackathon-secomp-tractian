// ServicePDFDocument.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ServiceModel } from '../models/Models';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
  },
  toolList: {
    marginLeft: 10,
  },
});

interface ServicePDFDocumentProps {
  services?: ServiceModel[];
}

// Create the PDF document structure
const ServicePDFDocument: React.FC<ServicePDFDocumentProps> = ({ services }) => (
  <Document>
    <Page style={styles.page}>
      {services && services.map((service, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.title}>{service.title}</Text>
          <Text>Description: {service.description}</Text>
          <Text style={styles.subheading}>Suggested Steps:</Text>
          {service.suggestedSteps.map((step, i) => (
            <Text key={i}>- {step}</Text>
          ))}
          <Text style={styles.subheading}>Suggested Tools:</Text>
          {service.suggestedTools.map((tool, i) => (
            <View key={i} style={styles.toolList}>
              <Text>• Code: {tool.code}</Text>
              <Text>Name: {tool.name}</Text>
              <Text>Quantity: {tool.quantity}</Text>
              <Text>Manual: {tool.manual}</Text>
            </View>
          ))}
          <Text>Estimated Time: {service.estimatedTime} hours</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ServicePDFDocument;


import { Landmark } from "lucide-react";
import React from "react";

interface DocumentWrapperProps {
  title: string;
  subHeader?: string;
  children: React.ReactNode;
}

export const DocumentWrapper: React.FC<DocumentWrapperProps> = ({ title, subHeader, children }) => {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
            <Landmark style={styles.logoIcon} />
            <span style={styles.logoText}>FLEXFOND</span>
        </div>
        <div style={styles.headerInfo}>
          <p>123 Rue de la Finance, 75001 Paris</p>
          <p>contact@flexfond.com | +33 1 23 45 67 89</p>
        </div>
      </header>
      
      {subHeader && <p style={styles.subHeader}>{subHeader}</p>}
      <h1 style={styles.title}>{title}</h1>

      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} FLEXFOND. Tous droits réservés.</p>
        <p>Ce document est généré électroniquement et est confidentiel.</p>
      </footer>
    </div>
  );
};

export const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '10pt',
    lineHeight: 1.6,
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '40px',
    width: '210mm',
    minHeight: '297mm',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2px solid #eeeeee',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
      width: '32px',
      height: '32px',
      color: '#4A5568'
  },
  logoText: {
    fontSize: '24pt',
    fontWeight: 'bold',
    color: '#2D3748',
    marginLeft: '10px'
  },
  headerInfo: {
    textAlign: 'right',
    fontSize: '9pt',
    color: '#718096',
  },
  subHeader: {
    textAlign: 'center',
    fontSize: '8pt',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '18pt',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D3748',
    marginBottom: '30px',
  },
  main: {
    flexGrow: 1,
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '12pt',
    fontWeight: 'bold',
    color: '#4A5568',
    borderBottom: '1px solid #dddddd',
    paddingBottom: '5px',
    marginBottom: '15px',
  },
  field: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    color: '#4A5568',
  },
  value: {
    color: '#333333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #dddddd',
    padding: '8px',
  },
  signatureSection: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  signatureBox: {
    width: '45%',
    textAlign: 'center',
  },
  signatureLine: {
    borderTop: '1px solid #333333',
    marginTop: '60px',
    marginBottom: '10px',
  },
  footer: {
    borderTop: '1px solid #eeeeee',
    paddingTop: '20px',
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '8pt',
    color: '#a0aec0',
  },
};

export const formatDate = (dateString: string) => {
    if (!dateString) return '[Date non spécifiée]';
    try {
        const date = new Date(dateString);
        // Add a day to correct for timezone issues
        date.setDate(date.getDate() + 1);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch(e) {
        return dateString;
    }
};


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
            <div style={styles.logoText}>VylsCapital</div>
        </div>
        <div style={styles.headerInfo}>
          <p>123 Rue de la Finance, 75001 Paris</p>
          <p>contact@vylscapital.com | +33 7 51 24 47 10</p>
        </div>
      </header>
      
      {subHeader && <p style={styles.subHeader}>{subHeader}</p>}
      <h1 style={styles.title}>{title}</h1>

      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} VylsCapital. Tous droits réservés.</p>
        <p>Ce document est généré électroniquement et est confidentiel.</p>
      </footer>
    </div>
  );
};

export const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '12pt',
    lineHeight: 1.6,
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
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
    borderBottom: '2px solid hsl(var(--border))',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '24pt',
    fontWeight: 'bold',
    color: 'hsl(var(--primary))',
  },
  headerInfo: {
    textAlign: 'right',
    fontSize: '10pt',
    color: 'hsl(var(--muted-foreground))',
  },
  subHeader: {
    textAlign: 'center',
    fontSize: '9pt',
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '20pt',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'hsl(var(--primary))',
    marginBottom: '30px',
  },
  main: {
    flexGrow: 1,
  },
  section: {
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '14pt',
    fontWeight: 'bold',
    color: 'hsl(var(--primary))',
    borderBottom: '1px solid hsl(var(--border))',
    paddingBottom: '5px',
    marginBottom: '15px',
  },
  field: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    color: 'hsl(var(--foreground))',
  },
  value: {
    color: 'hsl(var(--foreground))',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '11pt',
  },
  th: {
    border: '1px solid hsl(var(--border))',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: 'hsl(var(--secondary))',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid hsl(var(--border))',
    padding: '10px',
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
    borderTop: '1px solid hsl(var(--foreground))',
    marginTop: '10px',
    marginBottom: '10px',
  },
  footer: {
    borderTop: '1px solid hsl(var(--border))',
    paddingTop: '20px',
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '9pt',
    color: 'hsl(var(--muted-foreground))',
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


import React from 'react';
import { DocumentWrapper, styles } from './document-wrapper';

export interface BlankDocumentData {
  docTitle?: string;
  docContent?: string;
}

interface BlankDocumentTemplateProps {
  data: BlankDocumentData;
}

export const BlankDocumentTemplate: React.FC<BlankDocumentTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={data.docTitle || 'Document sans titre'}
    >
      <div style={styles.section}>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {data.docContent || 'Aucun contenu.'}
        </p>
      </div>
    </DocumentWrapper>
  );
};

import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <main style={{
      maxWidth: '1200px',
      flexGrow: 1
    }}>
      {children}
    </main>
  );
};

export default PageContent;
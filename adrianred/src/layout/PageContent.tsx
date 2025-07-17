import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <main style={{
      maxWidth: '1200px',
    //   margin: '0 auto',
    //   padding: '2rem 1rem',
      flexGrow: 1
    }}>
      {children}
    </main>
  );
};

export default PageContent;
// pages/help.tsx
import { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import { Navbar } from '../components/Navbar';

interface HelpPageProps {
  content: string;
}

const HelpPage: React.FC<HelpPageProps> = ({ content }) => {
  return (
    <>
      <Navbar />
      <div>
        <pre>{content}</pre>
    </div>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'help.txt');
  let content = '';

  try {
    // Read the content of the text file
    content = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading help.txt:', error);
  }

  return {
    props: {
      content,
    },
  };
};

export default HelpPage;
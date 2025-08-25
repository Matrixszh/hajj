'use client';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '200vh' }}>
      <Image
        src="/umrahflier.jpg" // Replace with your image path
        alt="Full Page Image"
        layout="fill"
        objectFit="fill"
        priority
      />
    </div>
  );
};

export default LandingPage;
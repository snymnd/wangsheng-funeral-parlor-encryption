import * as React from 'react';

import NextImage from '@/components/NextImage';

export default function FullPageLoader() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-neutral-icon'>
      <NextImage
        alt='loading image'
        width={250}
        height={250}
        src='/images/taohy.gif'
        imgClassName='rounded-full object-cover'
      />
      <p>Loading...</p>
    </div>
  );
}

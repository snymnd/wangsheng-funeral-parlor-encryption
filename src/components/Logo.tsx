import * as React from 'react';

import NextImage from '@/components/NextImage';

type LogoProps = {
  className?: string;
  imgClassName?: string;
};

export default function Logo({ className, imgClassName }: LogoProps) {
  return (
    <NextImage
      className={className}
      imgClassName={imgClassName}
      src='/images/logo.png'
      width={280}
      height={280}
      alt='logo'
    />
  );
}

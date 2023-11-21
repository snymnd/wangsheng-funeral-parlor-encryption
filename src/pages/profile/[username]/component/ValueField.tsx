import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type ValueFieldProps = {
  label: string | null | undefined;
  value: string | undefined;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ValueField({
  label,
  value,
  className,
  ...rest
}: ValueFieldProps) {
  return (
    <div className={clsxm('', className)} {...rest}>
      <Typography as='label' variant='s3' className='block' color='secondary'>
        {label}
      </Typography>
      <Typography variant='b1'>{value}</Typography>
    </div>
  );
}

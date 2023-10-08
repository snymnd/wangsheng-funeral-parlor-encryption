import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/typography/Typography';

const breadcrumbs = {
  '/': 'Landing Page',
  '/sandbox/breadcrumb': 'Breadcrumb',
};
type BreadcrumbProps = {
  crumbs: Array<keyof typeof breadcrumbs>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  crumbs: _crumbs,
  ...rest
}: BreadcrumbProps) {
  // split array into the last part and the rest
  const lastCrumb = _crumbs[_crumbs.length - 1];
  const crumbs = _crumbs.slice(0, _crumbs.length - 1);

  return (
    <div className={clsxm('space-x-1', className)} {...rest}>
      {crumbs.map((crumb) => (
        <React.Fragment key={crumb}>
          <PrimaryLink href={crumb} size='sm' className='font-medium'>
            {breadcrumbs[crumb]}
          </PrimaryLink>
          <ChevronRight className='inline h-3 w-3 md:h-4 md:w-4' />
        </React.Fragment>
      ))}
      <Typography as='span' variant='s4' className='md:s3'>
        {breadcrumbs[lastCrumb]}
      </Typography>
    </div>
  );
}

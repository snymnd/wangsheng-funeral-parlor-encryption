import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';

import FileContent from '@/pages/files/component/FileContent';
import { fileCategory } from '@/pages/files/index.page';

import { FileType } from '@/types/entities/file';

type UserFilesProps = React.ComponentPropsWithoutRef<'div'>;

export default function UserFiles({ className, ...rest }: UserFilesProps) {
  const [activeType, setActiveType] = React.useState<FileType>('docs');
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className={clsxm('', className)} defaultValue='document' {...rest}>
      <div className='mt-4'>
        {fileCategory.map((fileType) => (
          <Button
            onClick={() => setActiveType(fileType.type)}
            className={clsx([
              'mx-1 -ml-[2px] rounded-lg rounded-b-sm border-base-200 bg-gradient-to-b from-base-800 to-base-1000 px-4',
              activeType === fileType.type &&
                'border-b-transparent from-base-1000',
            ])}
            key={fileType.type + fileType.value}
          >
            {fileType.name}
          </Button>
        ))}
      </div>

      <div className='space-y-2'>
        {activeType === 'docs' && (
          <FileContent
            username={username as string}
            readonly
            file={fileCategory[0]}
          />
        )}
        {activeType === 'video' && (
          <FileContent
            username={username as string}
            readonly
            file={fileCategory[1]}
          />
        )}
        {activeType === 'misc' && (
          <FileContent
            username={username as string}
            readonly
            file={fileCategory[2]}
          />
        )}
      </div>
    </div>
  );
}

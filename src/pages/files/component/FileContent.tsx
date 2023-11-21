import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Typography from '@/components/typography/Typography';

import FilesList from '@/pages/files/component/FilesList';
import { FileCategory } from '@/pages/files/index.page';

type FileContentProps = {
  file: FileCategory;
  readonly?: boolean;
  username: string | undefined;
  isUploadLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FileContent({
  file,
  isUploadLoading = false,
  className,
  username,
  readonly = false,
  ...rest
}: FileContentProps) {
  return (
    <div className={clsxm('mt-4', className)} {...rest}>
      {!readonly && (
        <>
          <DropzoneInput
            id='file'
            title={`Search or drag & drop your ${file.value} here`}
            label={'Add ' + file.value}
            description=''
            accept={file.format}
            validation={{
              required: 'Profile picture is required',
            }}
            maxSize={100000000}
          />
          <div className='mt-2 flex justify-end gap-2'>
            <Button type='submit' isLoading={isUploadLoading}>
              Upload {file.value}
            </Button>
          </div>
          <hr className='my-4 border-base-600' />
        </>
      )}

      <Typography variant='h3'>List of {file.name}</Typography>
      <FilesList username={username} fileType={file.type} className='mt-2' />
    </div>
  );
}

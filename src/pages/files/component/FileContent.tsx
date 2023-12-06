import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Typography from '@/components/typography/Typography';

import FilesList from '@/pages/files/component/FilesList';
import { FileCategory } from '@/pages/files/index.page';

type FileContentProps = {
  fileCategory: FileCategory;
  readonly?: boolean;
  username: string | undefined;
  isUploadLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FileContent({
  fileCategory,
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
            title={`Search or drag & drop your ${fileCategory.value} here`}
            label={'Add ' + fileCategory.value}
            description=''
            accept={fileCategory.format}
            validation={{
              required: 'Profile picture is required',
            }}
            maxSize={100000000}
          />
          <div className='mt-2 flex justify-end gap-2'>
            <Button type='submit' isLoading={isUploadLoading}>
              Upload {fileCategory.value}
            </Button>
          </div>
          <hr className='my-4 border-base-600' />
        </>
      )}

      <Typography variant='h3'>List of {fileCategory.name}</Typography>
      <FilesList
        needRequest={readonly}
        username={username}
        fileType={fileCategory.type}
        className='mt-2'
      />
    </div>
  );
}

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { convertUrlToFileWithPreview } from '@/lib/form-utils';
import { useGetFileByTypeQuery } from '@/hooks/query/file';

import DropzoneInput from '@/components/forms/DropzoneInput';
import FullPageLoader from '@/components/FullPageLoader';

import { BASE_URL } from '@/constant/env';

import { File, FileType } from '@/types/entities/file';

type FilesListProps = {
  fileType: FileType;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FilesList({
  fileType,
  className,
  ...rest
}: FilesListProps) {
  //#region  //*=========== Query ===========
  const { data: fileList, isLoading: isFileListLoading } =
    useGetFileByTypeQuery(fileType);
  //#endregion  //*======== Query ===========

  isFileListLoading && <FullPageLoader />;

  return (
    <div
      className={clsxm('grid grid-cols-2 gap-3 sm:grid-cols-4', className)}
      {...rest}
    >
      {fileList?.map((file) => (
        <>
          {file.type !== 'video' ? (
            <FilePreview file={file} key={file.id} />
          ) : (
            <video
              width='320'
              height='240'
              controls
              className='aspect-video rounded'
            >
              <source
                src={`${BASE_URL}/file/${file.id}`}
                key={file.id}
                type='video/mp4'
              />
            </video>
          )}
        </>
      ))}
    </div>
  );
}

type FilePreviewProps = {
  file: File;
} & React.ComponentPropsWithoutRef<'input'>;

function FilePreview({ file, ...rest }: FilePreviewProps) {
  const methods = useForm({
    values: {
      [file.id]: convertUrlToFileWithPreview({
        url: `${BASE_URL}/file/${file.id}`,
        fileName: file.filename,
      }),
    },
  });

  return (
    <FormProvider {...methods} {...rest}>
      <DropzoneInput label={null} id={file.id.toString()} readOnly />
    </FormProvider>
  );
}

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImSpinner8 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';
import { convertUrlToFileWithPreview } from '@/lib/form-utils';
import { getFileQuery, useGetFileByTypeQuery } from '@/hooks/query/file';

import DropzoneInput from '@/components/forms/DropzoneInput';
import FullPageLoader from '@/components/FullPageLoader';

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
  const fileListData = fileList?.data;
  //#endregion  //*======== Query ===========

  isFileListLoading && <FullPageLoader />;

  return (
    <div
      className={clsxm('grid grid-cols-2 gap-3 sm:grid-cols-4', className)}
      {...rest}
    >
      {fileListData?.map((file) => (
        <FilePreview file={file} key={file.id} />
      ))}
    </div>
  );
}

type FilePreviewProps = {
  file: File;
} & React.ComponentPropsWithoutRef<'input'>;

function FilePreview({ file, ...rest }: FilePreviewProps) {
  const [fileUrl, setFileUrl] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    getFileQuery(file.id.toString())
      .then((res) => {
        setFileUrl(res);
      })
      .catch(() => {
        toast.error(`failed to get ${file.filename}`, { id: file.filename });
      });
  }, [file]);

  const methods = useForm({
    values: {
      [file.id]: convertUrlToFileWithPreview({
        url: fileUrl,
        fileName: file.filename,
      }),
    },
  });

  return (
    <FormProvider {...methods} {...rest}>
      {fileUrl ? (
        file.type === 'video' ? (
          <video
            width='320'
            height='240'
            controls
            className='aspect-video rounded'
          >
            <source src={fileUrl} key={file.id} type='video/mp4' />
          </video>
        ) : (
          <DropzoneInput label={null} id={file.id.toString()} readOnly />
        )
      ) : (
        <div className='flex items-center justify-center gap-2'>
          <ImSpinner8 className='animate-spin text-2xl' />
          <p>Loading...</p>
        </div>
      )}
    </FormProvider>
  );
}

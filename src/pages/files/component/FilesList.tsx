import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImSpinner8 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';
import { convertUrlToFileWithPreview } from '@/lib/form-utils';
import { getFileQuery, useGetFileByTypeQuery } from '@/hooks/query/file';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import FullPageLoader from '@/components/FullPageLoader';
import Typography from '@/components/typography/Typography';

import { File, FileType } from '@/types/entities/file';

type FilesListProps = {
  fileType: FileType;
  username: string | undefined;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FilesList({
  fileType,
  username,
  className,
  ...rest
}: FilesListProps) {
  //#region  //*=========== Query ===========
  const { data: fileList, isLoading: isFileListLoading } =
    useGetFileByTypeQuery(username, fileType);
  const fileListData = fileList?.data;
  //#endregion  //*======== Query ===========

  isFileListLoading && <FullPageLoader />;

  return (
    <div
      className={clsxm('mb-4 grid grid-cols-2 gap-5 sm:grid-cols-4', className)}
      {...rest}
    >
      {fileListData && fileListData.length > 0 ? (
        fileListData?.map((file) => <FilePreview file={file} key={file.id} />)
      ) : (
        <Typography variant='h4' color='tertiary'>
          No {fileType} found for now.
        </Typography>
      )}
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
          <div className='flex w-full gap-1'>
            <DropzoneInput
              label={null}
              id={file.id.toString()}
              readOnly
              className='flex-1'
            />
            {file.filename.split('.')[file.filename.split('.').length - 1] ==
              'pdf' && <Button className='inline'>sign pdf</Button>}
          </div>
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

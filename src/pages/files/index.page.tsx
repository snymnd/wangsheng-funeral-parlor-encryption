import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { serialize } from 'object-to-formdata';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { UploadBody, useUploadFileMutation } from '@/hooks/mutation/uploadFile';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import FileContent from '@/pages/files/component/FileContent';

import { FileWithPreview } from '@/types/dropzone';
import { FileType } from '@/types/entities/file';

export default withAuth(FilesPage, ['USER']);
// export default
function FilesPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore.useUser();
  const [activeType, setActiveType] = React.useState<FileType>('docs');

  const methods = useForm<{ file: FileWithPreview[]; type: FileType }>();
  const { handleSubmit, reset } = methods;

  //#region  //*=========== Mutation ===========
  const { mutateAsync: uploadFile, isLoading: isUploadFileLoading } =
    useUploadFileMutation();
  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: { file: FileWithPreview[]; type: FileType }) => {
    const uploadPayload: UploadBody = {
      type: activeType,
      file: data.file[0],
    };

    const serializedData = serialize<UploadBody>(uploadPayload);

    uploadFile(serializedData).then(() => {
      queryClient.invalidateQueries({
        queryKey: [`/files/${user?.username}?type=${activeType}`],
      });
      reset();
    });
    return;
  };
  //#endregion  //*======== Form Submit ===========

  React.useEffect(() => {
    reset();
  }, [reset, activeType]);

  return (
    <DashboardLayout>
      <Seo templateTitle='Files' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen'>
            <div className='flex items-end'>
              <div className='space-y-1'>
                <Typography variant='h1'>My Files</Typography>
                <Typography variant='c1' color='tertiary'>
                  Brought all your secret along with your funeral
                </Typography>
              </div>
            </div>
            {/* <hr className='my-2' /> */}
            <div defaultValue='document'>
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

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                  {activeType === 'docs' && (
                    <FileContent
                      username={user?.username}
                      fileCategory={fileCategory[0]}
                      isUploadLoading={isUploadFileLoading}
                    />
                  )}
                  {activeType === 'video' && (
                    <FileContent
                      username={user?.username}
                      fileCategory={fileCategory[1]}
                      isUploadLoading={isUploadFileLoading}
                    />
                  )}
                  {activeType === 'misc' && (
                    <FileContent
                      username={user?.username}
                      fileCategory={fileCategory[2]}
                      isUploadLoading={isUploadFileLoading}
                    />
                  )}
                </form>
              </FormProvider>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

export type FileCategory = {
  name: string;
  value: string;
  type: FileType;
  format: {
    [key: string]: string[];
  };
};

export const fileCategory: FileCategory[] = [
  {
    name: 'Documents',
    value: 'document',
    type: 'docs',
    format: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
    },
  },
  {
    name: 'Videos',
    value: 'video',
    type: 'video',
    format: {
      'video/mp4': ['.mp4'],
      'video/mpeg': ['.mpeg'],
      'video/x-matroska': ['.mkv'],
      'video/x-msvideo': ['.avi'],
    },
  },
  {
    name: 'Misc',
    value: 'misc',
    type: 'misc',
    format: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
      'video/mp4': ['.mp4'],
      'video/mpeg': ['.mpeg'],
      'video/x-matroska': ['.mkv'],
      'video/x-msvideo': ['.avi'],
      'application/zip': ['.zip'],
    },
  },
];

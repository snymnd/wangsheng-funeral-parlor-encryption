import { useQueryClient } from '@tanstack/react-query';
import { serialize } from 'object-to-formdata';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';
import { UploadBody, useUploadFileMutation } from '@/hooks/mutation/uploadFile';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Modal from '@/components/modal/Modal';

import useAuthStore from '@/store/useAuthStore';

import { FileWithPreview } from '@/types/dropzone';

type UploadProfileModalProps = {
  openModal: () => void;
};

export default function UploadIdCardModal({
  children,
}: {
  children: (props: UploadProfileModalProps) => JSX.Element;
}) {
  const user = useAuthStore.useUser();
  const queryClient = useQueryClient();
  const methods = useForm<{ id_card: FileWithPreview[] }>();
  const { handleSubmit } = methods;

  const [open, setOpen] = React.useState(false);
  const modalReturn: UploadProfileModalProps = {
    openModal: () => setOpen(true),
  };

  //#region  //*=========== Mutation ===========
  const {
    mutateAsync: uploadProfilePicture,
    isLoading: isUploadProfileLoading,
  } = useUploadFileMutation();
  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: { id_card: FileWithPreview[] }) => {
    logger({ data }, 'rhf.tsx line 33');

    const uploadPayload: UploadBody = {
      type: 'id_card',
      file: data.id_card[0],
    };

    const serializeData = serialize<UploadBody>(uploadPayload);

    uploadProfilePicture(serializeData).then(() => {
      queryClient.invalidateQueries({
        queryKey: [`/files/${user?.username}?type=id_card`],
      });
      setOpen(false);
    });
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Profile Picture'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Section>
              <DropzoneInput
                id='id_card'
                label={null}
                description='Accepted file types: .png, .jpeg, .jpg'
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpeg', '.jpg'],
                }}
                validation={{
                  required: 'Id Card is required',
                }}
                maxSize={10000000}
              />
            </Modal.Section>
            <Modal.Section>
              <div className='flex justify-end gap-2'>
                <Button type='submit' isLoading={isUploadProfileLoading}>
                  Save
                </Button>
              </div>
            </Modal.Section>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}

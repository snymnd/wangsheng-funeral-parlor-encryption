import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Modal from '@/components/modal/Modal';

type UploadProfileModalProps = {
  openModal: () => void;
};

export default function UploadProfileModal({
  children,
}: {
  children: (props: UploadProfileModalProps) => JSX.Element;
}) {
  const methods = useForm();
  const [open, setOpen] = React.useState(false);
  const modalReturn: UploadProfileModalProps = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Profile Picture'>
        <Modal.Section>
          <FormProvider {...methods}>
            <form>
              <DropzoneInput
                id='profile_picture'
                label={null}
                description='Accepted file types: .png, .jpeg, .jpg'
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpeg', '.jpg'],
                }}
                validation={{
                  required: 'Profile picture is required',
                }}
              />
            </form>
          </FormProvider>
        </Modal.Section>
        <Modal.Section>
          <div className='flex justify-end gap-2'>
            <Button>Save</Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}

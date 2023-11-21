import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/forms/TextArea';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';

import { useInsertKeyMutation } from '@/pages/access-list/hook/mutation';
import UserProfileContainer from '@/pages/profile/[username]/component/UserProfileContainer';

import { ApiResponse } from '@/types/api';
import { UserResponse } from '@/types/entities/user';

export default function InsertKeyModal({ username }: { username: string }) {
  const [user, setUser] = React.useState<ApiResponse<UserResponse> | null>(
    null
  );
  const [open, setOpen] = React.useState(true);
  //#region  //*=========== Mutation ===========
  const { mutateAsync: insertKey, isLoading } = useInsertKeyMutation();

  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form ===========
  const methods = useForm<{ key: string }>({
    mode: 'onChange',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: { key: string }) => {
    logger({ data }, 'rhf.tsx line 33');
    insertKey({
      username: username,
      key: data.key,
    }).then((res) => {
      setOpen(false);
      setUser(res.data);
    });
    reset();
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      <Modal open={open} setOpen={setOpen} title={`Insert Key for ${username}`}>
        <Modal.Section>
          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-2 text-end'
              >
                <div className='flex-1'>
                  <div className='relative'>
                    <TextArea
                      id='key'
                      label={null}
                      className='h-48'
                      placeholder={`Put ${username}'s public key here`}
                      validation={{
                        required: 'Key is required',
                      }}
                    />
                  </div>
                </div>
                <Button type='submit' isLoading={isLoading}>
                  Send
                </Button>
              </form>
            </FormProvider>
          </div>
        </Modal.Section>
      </Modal>

      {user ? (
        <UserProfileContainer user={user.data} />
      ) : (
        <Typography variant='b3' className='p-4' color='secondary'>
          You dont have access to this data
        </Typography>
      )}
    </>
  );
}

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';

import REGEX from '@/constant/regex';
import { useRequestAccessMutation } from '@/pages/access-list/hook/mutation';

type ModalReturnType = {
  openModal: () => void;
};

export default function ReqAccessModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  const queryClient = useQueryClient();

  //#region  //*=========== Mutation ===========
  const { mutateAsync: requestAccess, isLoading } = useRequestAccessMutation();

  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form ===========
  const methods = useForm<{ search: string }>({
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const error = get(errors, 'search');
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: { search: string }) => {
    logger({ data }, 'rhf.tsx line 33');
    requestAccess({ username: data.search }).then(() =>
      queryClient.invalidateQueries(['/request/list?dir=0'])
    );
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Request Access'>
        <Modal.Section>
          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-start justify-between  gap-2'
              >
                <div className='flex-1'>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <FiSearch className='text-xl text-typo' />
                    </div>
                    <input
                      type='text'
                      {...register('search', {
                        required: 'Search is required',
                        pattern: {
                          value: REGEX.USERNAME,
                          message: 'Username must be valid (whithout space)',
                        },
                      })}
                      className={clsx(
                        'flex w-full rounded-lg text-base-1000 shadow-sm',
                        'min-h-[2.25rem] px-9 py-0 md:min-h-[2.5rem]',
                        'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
                      )}
                      placeholder='Search...'
                    />
                  </div>

                  {error && (
                    <Typography variant='c1' color='danger' className='mt-1'>
                      {error?.message?.toString()}
                    </Typography>
                  )}
                </div>
                <Button
                  type='submit'
                  disabled={error ? true : false}
                  isLoading={isLoading}
                >
                  Request
                </Button>
              </form>
            </FormProvider>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}

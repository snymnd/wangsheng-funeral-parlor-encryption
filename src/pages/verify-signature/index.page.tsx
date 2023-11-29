import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { FileWithPreview } from '@/types/dropzone';

export default function VerifySignaturePage() {
  const methods = useForm<{ file: FileWithPreview[] }>();
  const { handleSubmit } = methods;

  //#region  //*=========== Onsubmit ===========
  const onSubmit = (data: { file: FileWithPreview[] }) => {
    logger({ data }, 'index.page.tsx line 16');
  };
  //#endregion  //*======== Onsubmit ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Verify Signature' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen space-y-4'>
            <div className='flex items-end'>
              <div className='space-y-1'>
                <Typography variant='h1'>Verify Signature</Typography>
                <Typography variant='c1' color='tertiary'>
                  Don't let them sabotage your legacy
                </Typography>
              </div>
            </div>
            <hr className='my-2' />
            <FormProvider {...methods}>
              <div className='mx-auto w-full max-w-xl'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='space-y-3 text-center'
                >
                  <DropzoneInput
                    label={null}
                    accept={{
                      'application/pdf': ['.pdf'],
                    }}
                    description='Accepted file types .pdf only'
                    id='file'
                    containerClassName='h-96'
                  />
                  <Button type='submit'>Check File</Button>
                </form>
              </div>
            </FormProvider>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

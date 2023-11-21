import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DevelopmentCard from '@/components/cards/DevelopmentCard';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import REGEX from '@/constant/regex';
import { useLoginMutation } from '@/pages/login/hook/mutation';

type LoginForm = {
  username: string;
  password_: string;
};

export default withAuth(LoginPage, 'auth');
function LoginPage() {
  //#region  //*=========== Mutation ===========
  const { mutateAsync: login, isLoading } = useLoginMutation();
  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form ===========
  const methods = useForm<LoginForm>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { isDirty, errors },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: LoginForm) => {
    logger({ data }, 'rhf.tsx line 33');
    // data.password => data.password_
    login({
      username: data.username,
      password: data.password_,
    });

    return;
  };
  //#endregion  //*======== Form Submit ===========

  const errorExist = Object.keys(errors).length > 0 && isDirty;

  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main className='bg-[url(/images/auth-bg.png)]'>
        <section className='bg-dark/50'>
          <div className='layout flex min-h-screen items-center justify-center py-20'>
            <div className='rounded-lg border-base-700 bg-base-1000 p-6 shadow-md md:p-8'>
              <div className='flex justify-between gap-x-2 md:justify-center'>
                <div className='md:text-center'>
                  <Typography as='h2' variant='h3' className='md:h2'>
                    Wangsheng Funeral Parlor
                  </Typography>
                  <Typography
                    as='h3'
                    variant='b2'
                    color='secondary'
                    className='italic'
                  >
                    "It's time to find your peace."
                  </Typography>
                </div>
                <div className='md:hidden'>
                  <NextImage
                    alt='hu-tao-error-detector'
                    width={100}
                    height={100}
                    src={
                      errorExist ? '/images/error.gif' : '/images/no-error.gif'
                    }
                    className=''
                    imgClassName='rounded-lg'
                  />
                </div>
              </div>

              <div className='mt-4 flex items-center justify-center gap-8'>
                <div className='w-full max-w-md'>
                  <Typography variant='h4' as='h3'>
                    Log In
                  </Typography>
                  <hr className='my-2' />
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <Input
                        id='username'
                        label='Username'
                        validation={{ required: 'Name must be filled' }}
                        placeholder='Enter your username'
                      />
                      <PasswordInput
                        id='password_'
                        autoComplete='new-password'
                        label='Password'
                        validation={{
                          required: 'Password must be filled',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                          },
                          pattern: {
                            value: REGEX.PASSWORD,
                            message:
                              'Password must be combination of lowercase, uppercase, number, and special character(#?!@$%^&*-)',
                          },
                        }}
                        helperText="Forgot your password? then it's your problem😆"
                        placeholder='Enter your password'
                      />

                      <div className='space-y-2'>
                        <Button
                          className='mt-6 w-full'
                          type='submit'
                          isLoading={isLoading}
                        >
                          Log In
                        </Button>
                        <div>
                          <Typography
                            variant='b3'
                            className='mt-2 inline text-center'
                            color='secondary'
                          >
                            Need an account?{' '}
                          </Typography>
                          <ArrowLink
                            href='/register'
                            className='b3 text-primary-400'
                          >
                            Register
                          </ArrowLink>
                        </div>
                      </div>
                      <DevelopmentCard className='mt-4'>
                        <Button
                          onClick={() => {
                            methods.setValue('username', 'yunusan');
                            methods.setValue('password_', 'Angka123-');
                          }}
                          className='mt-2'
                        >
                          Populate with dummy data
                        </Button>
                      </DevelopmentCard>
                    </form>
                  </FormProvider>
                </div>

                <div className='hidden max-w-[1/3] md:block'>
                  <NextImage
                    alt='hu-tao-error-detector'
                    width={300}
                    height={300}
                    src={
                      errorExist ? '/images/error.gif' : '/images/no-error.gif'
                    }
                    className='w-full'
                    imgClassName='rounded-lg'
                  />
                  <Typography
                    variant='c1'
                    color='tertiary'
                    className='mt-2 text-center'
                  >
                    Please fill it completely. if you won't, I'll burst you.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DevelopmentCard from '@/components/cards/DevelopmentCard';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import Radio from '@/components/forms/Radio';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import REGEX from '@/constant/regex';
import { useRegisterMutation } from '@/pages/register/hook/mutation';

export type RegisterForm = {
  name: string;
  phone_number: string;
  username: string;
  gender: 'male' | 'female';
  password_: string;
  re_password: string;
  email: string;
  birth_place: string;
  birth_date: string;
  religion: string;
  address: string;
  nationality: 'indonesia' | 'outside';
  profile_picture?: string;
};

export const RELIGION_OPTIONS = [
  { value: 'islam', label: 'Islam' },
  { value: 'kristen', label: 'Kristen' },
  { value: 'katolik', label: 'Katolik' },
  { value: 'hindu', label: 'Hindu' },
  { value: 'budha', label: 'Budha' },
  { value: 'konghucu', label: 'Konghucu' },
];

export default function RegisterPage() {
  const router = useRouter();

  //#region  //*=========== Mutation ===========
  const { mutateAsync: register, isLoading: isRegisterLoading } =
    useRegisterMutation();
  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form ===========
  const methods = useForm<RegisterForm>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: RegisterForm) => {
    logger({ data }, 'rhf.tsx line 33 Register');
    register({
      name: data.name,
      username: data.username,
      password: data.password_,
      address: data.address,
      birth_info: `${data.birth_place}, ${data.birth_date}`,
      gender: data.gender,
      phone_number: `62${data.phone_number}`,
      nationality: data.nationality,
      religion: data.religion,
    }).then(() => {
      router.push('/login');
    });

    return;
  };
  //#endregion  //*======== Form Submit ===========

  const errorExist = Object.keys(errors).length > 0 && isDirty;

  return (
    <Layout>
      <Seo templateTitle='Register' />

      <main className='bg-[url(/images/auth-bg.png)] bg-cover bg-no-repeat'>
        <section className='bg-dark/50'>
          <div className='layout flex min-h-screen items-center justify-center py-20'>
            <div className='rounded-lg border-base-700 bg-base-1000 p-6 shadow-md md:p-8'>
              <div className='flex justify-between gap-x-2'>
                <div>
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
                <div>
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
              <div className='mt-4'>
                <Typography variant='h4' as='h3'>
                  Create an Account
                </Typography>
                <hr className='my-2' />
                <div className='mt-2'>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <div className='grid-cols-2 gap-x-6 space-y-3 md:grid md:space-y-0'>
                        <div className='space-y-3'>
                          <Input
                            id='name'
                            label='Name'
                            validation={{ required: 'Name must be filled' }}
                            placeholder='Enter your Name'
                          />
                          <Input
                            id='username'
                            label='Username'
                            validation={{ required: 'Username must be filled' }}
                            placeholder='Enter your username'
                          />

                          <div className='flex flex-wrap gap-x-4 gap-y-2'>
                            <Input
                              id='birth_place'
                              containerClassName='flex-1 min-w-[200px]'
                              label='Place of Birth'
                              placeholder='Enter your place of birth'
                            />
                            <DatePicker
                              id='birth_date'
                              label='Date of Birth'
                              containerClassName='flex-1 min-w-[200px]'
                              maxDate={new Date()}
                              validation={{
                                required: 'Date of Birth must be filled',
                              }}
                              placeholder='dd/mm/yyyy'
                            />
                          </div>

                          <Input
                            id='phone_number'
                            label='Phone Number'
                            validation={{
                              required: 'Phone number must be filled',
                              pattern: {
                                value: REGEX.PHONE_NUMBER,
                                message: 'Phone number must be valid',
                              },
                            }}
                            placeholder={`Phone number start with '8'`}
                            leftNode={
                              <Typography variant='b2' color='tertiary'>
                                +62 |
                              </Typography>
                            }
                          />

                          <div className='space-y-1'>
                            <Typography variant='s3' color='secondary'>
                              I identify my gender as..
                            </Typography>
                            <Radio
                              name='gender'
                              label='Male'
                              value='male'
                              // hideError on every radio except the last one, or use ErrorMessage
                              hideError
                            />
                            <Radio
                              name='gender'
                              label='Female'
                              value='female'
                              hideError
                            />
                            <Radio
                              name='gender'
                              label='A Fish'
                              value='fish'
                              disabled
                              helperText="if it's disabled, then your not a fish"
                              // validation only on the last element, or you can use <ErrorMessage />
                              validation={{ required: 'Gender must be filled' }}
                            />
                          </div>
                        </div>

                        <div className='space-y-3'>
                          <SearchableSelectInput
                            id='religion'
                            placeholder='Chose your religion'
                            label='Religion'
                            validation={{ required: 'Religion must be filled' }}
                            options={RELIGION_OPTIONS}
                          />
                          <SearchableSelectInput
                            id='nationality'
                            label='Nationality'
                            placeholder='Chose your nationality type'
                            options={[
                              { value: 'indonesia', label: 'Indonesia' },
                              {
                                value: 'outside',
                                label: 'Outside of Indonesia',
                              },
                            ]}
                            validation={{
                              required: 'Nationality must be filled',
                            }}
                          />
                          <TextArea
                            id='address'
                            label='Address'
                            placeholder='Enter your address'
                            validation={{ required: 'Address must be filled' }}
                          />

                          <hr />

                          <PasswordInput
                            id='password_'
                            label='Password'
                            autoComplete='new-password'
                            validation={{
                              required: 'Password must be filled',
                              minLength: {
                                value: 8,
                                message:
                                  'Password must be at least 8 characters',
                              },
                              pattern: {
                                value: REGEX.PASSWORD,
                                message:
                                  'Password must be combination of lowercase, uppercase, number, and special character(#?!@$%^&*-)',
                              },
                            }}
                            placeholder='Enter your password'
                          />
                          <PasswordInput
                            id='re_password'
                            label='Confirm Password'
                            validation={{
                              required: 'Confirm Password must be filled',

                              validate: (value) =>
                                value === methods.getValues('password_') ||
                                'Confirmation passwords do not match with password',
                            }}
                            placeholder='Re-enter your password'
                          />
                        </div>
                      </div>

                      <div className='flex w-full flex-col items-end space-y-2 sm:flex-row sm:justify-between'>
                        <Button
                          className='mt-2 w-full sm:w-fit'
                          type='submit'
                          isLoading={isRegisterLoading}
                        >
                          Register
                        </Button>
                        <div className='sm:order-first'>
                          <Typography
                            variant='b3'
                            className='mt-2 inline text-center'
                            color='secondary'
                          >
                            Already have an account?{' '}
                          </Typography>
                          <ArrowLink
                            href='/login'
                            className='b3 text-primary-400'
                          >
                            Log In
                          </ArrowLink>
                        </div>
                      </div>
                    </form>
                    <DevelopmentCard className='mt-4'>
                      <Button
                        onClick={() => {
                          methods.setValue(
                            'address',
                            'Keputih, Sukolilo, Surabaya, East Java 60117'
                          );
                          methods.setValue('birth_place', 'Tevyat');
                          methods.setValue('birth_date', '2012/2/29');
                          methods.setValue('gender', 'male');
                          methods.setValue('nationality', 'indonesia');
                        }}
                        className='mt-2'
                      >
                        Populate with dummy data
                      </Button>
                    </DevelopmentCard>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { Edit2 } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import Radio from '@/components/forms/Radio';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { BASE_URL } from '@/constant/env';
import REGEX from '@/constant/regex';
import UploadProfileModal from '@/pages/profile/component/ProfilePictureModal';
import { useGetFileQuery } from '@/pages/profile/hooks/query';
import { RegisterForm, RELIGION_OPTIONS } from '@/pages/register/index.page';

export default function ProfilePage() {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  //#region  //*=========== Query ===========
  const { data: profilePicture, isLoading: isProfilePictureLoading } =
    useGetFileQuery('profile_picture');
  const profilePictureData = profilePicture?.[profilePicture?.length - 1];
  const profilePictureUrl = `${BASE_URL}/file/${profilePictureData?.id}`;
  //#endregion  //*======== Query ===========

  //#region  //*=========== Form ===========
  const methods = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: {
      address: 'Keputih, Sukolilo, Surabaya, East Java 60117',
      birth_place: 'Tevyat',
      birth_date: '2012/2/29',
      email: 'your@mail.com',
      phone_number: '895612312312',
      gender: 'male',
      name: 'John Doe',
      nationality: 'indonesia',
      username: 'johndoe',
      religion: 'islam',
      password_: 'Asdf123-',
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: RegisterForm) => {
    logger({ data }, 'rhf.tsx line 33');

    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Profile' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen'>
            <div className='flex items-end justify-between'>
              <div>
                <Typography variant='h1'>Profile</Typography>
                <Typography variant='c1' color='tertiary'>
                  See or update your profile
                </Typography>
              </div>
              {!isDirty && (
                <div className='flex gap-x-2'>
                  <Typography
                    variant='b2'
                    color={!isEdit ? 'secondary' : 'base'}
                  >
                    Edit Mode
                  </Typography>
                  <Switch
                    checked={isEdit}
                    onChange={setIsEdit}
                    className={`${
                      !isEdit
                        ? 'border border-primary-800 bg-transparent'
                        : 'bg-primary-700'
                    } relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className='sr-only'>Use setting</span>
                    <span
                      aria-hidden='true'
                      className={`${
                        isEdit
                          ? 'translate-x-7 bg-white'
                          : 'translate-x-0 bg-gray-300'
                      }
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              )}
            </div>
            <hr className='my-2' />
            <div>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='mt-4 space-y-4'
                >
                  <div className='grid-cols-2 gap-x-6 space-y-3 md:grid md:space-y-0'>
                    <div className='space-y-3'>
                      <div className='flex w-full justify-center'>
                        <UploadProfileModal>
                          {({ openModal }) => (
                            <button
                              type='button'
                              onClick={openModal}
                              className={clsx([
                                'group h-60 w-60 overflow-hidden rounded-full border-2 border-primary-600 bg-cover bg-center bg-no-repeat',
                              ])}
                              style={{
                                backgroundImage: isProfilePictureLoading
                                  ? `url(/images/taobal.gif)`
                                  : `url(${profilePictureUrl})`,
                              }}
                            >
                              <div className='hidden h-full w-full items-center justify-center rounded-full bg-black/50 group-hover:flex'>
                                <Edit2 size={50} className='w-full' />
                              </div>
                            </button>
                          )}
                        </UploadProfileModal>
                      </div>

                      <Input
                        id='name'
                        label='Name'
                        validation={{ required: 'Name must be filled' }}
                        placeholder='Enter your Name'
                        readOnly={!isEdit}
                      />
                      <Input
                        id='username'
                        label='Username'
                        validation={{ required: 'Username must be filled' }}
                        placeholder='Enter your username'
                        readOnly={!isEdit}
                      />
                      <Input
                        id='email'
                        label='Email'
                        validation={{
                          required: 'Email must be filled',
                          pattern: {
                            value: REGEX.EMAIL,
                            message: 'Email must be valid',
                          },
                        }}
                        placeholder='Enter your email'
                        readOnly={!isEdit}
                      />
                      <div className='space-y-1'>
                        <Typography variant='s3' color='secondary'>
                          I identify my gender as..
                        </Typography>
                        <Radio
                          name='gender'
                          label='Male'
                          value='male'
                          readOnly={!isEdit}
                          // hideError on every radio except the last one, or use ErrorMessage
                          hideError
                        />
                        <Radio
                          name='gender'
                          label='Female'
                          value='female'
                          readOnly={!isEdit}
                          hideError
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <div className='flex flex-wrap gap-x-4 gap-y-2'>
                        <Input
                          id='birth_place'
                          containerClassName='flex-1 min-w-[200px]'
                          label='Place of Birth'
                          validation={{
                            required: 'Place of Birth must be filled',
                          }}
                          placeholder='Enter your place of birth'
                          readOnly={!isEdit}
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
                          readOnly={!isEdit}
                        />
                      </div>
                      <SearchableSelectInput
                        id='religion'
                        placeholder='Chose your religion'
                        label='Religion'
                        validation={{ required: 'Religion must be filled' }}
                        options={RELIGION_OPTIONS}
                        readOnly={!isEdit}
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
                        readOnly={!isEdit}
                      />
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
                          <Typography
                            variant='b2'
                            color={isEdit ? 'tertiary' : 'secondary'}
                          >
                            +62 |
                          </Typography>
                        }
                        readOnly={!isEdit}
                      />
                      <TextArea
                        id='address'
                        label='Address'
                        placeholder='Enter your address'
                        validation={{ required: 'Address must be filled' }}
                        readOnly={!isEdit}
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
                            message: 'Password must be at least 8 characters',
                          },
                          pattern: {
                            value: REGEX.PASSWORD,
                            message:
                              'Password must be combination of lowercase, uppercase, number, and special character(#?!@$%^&*-)',
                          },
                        }}
                        placeholder='Enter your password'
                        readOnly={!isEdit}
                      />
                      {isEdit && (
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
                      )}
                    </div>
                  </div>
                  {isEdit && (
                    <div className='flex w-full justify-end'>
                      <Button
                        className='mt-2 sm:w-fit'
                        type='submit'
                        disabled={!isDirty}
                      >
                        Save
                      </Button>
                    </div>
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

import { Switch } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Edit2, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import logger from '@/lib/logger';
import { getFileQuery, useGetFileByTypeQuery } from '@/hooks/query/file';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import Radio from '@/components/forms/Radio';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import REGEX from '@/constant/regex';
import UploadIdCardModal from '@/pages/profile/component/IdCardModal';
import UploadProfileModal from '@/pages/profile/component/ProfilePictureModal';
import { useUpdateProfileMutation } from '@/pages/profile/hook/mutation';
import { RegisterForm, RELIGION_OPTIONS } from '@/pages/register/index.page';

export default withAuth(ProfilePage, ['USER']);
// export default
function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore.useUser();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>(
    undefined
  );
  const [idCardUrl, setIdCardUrl] = React.useState<string | undefined>(
    undefined
  );

  //#region  //*=========== Query ===========
  const { data: profilePicture, isLoading: isProfilePictureLoading } =
    useGetFileByTypeQuery('profile_picture');
  const profilePictureData =
    profilePicture?.data?.[profilePicture.data.length - 1];

  const { data: idCard, isLoading: isIdCardLoading } =
    useGetFileByTypeQuery('id_card');
  const idCardData = idCard?.data?.[idCard.data.length - 1];

  React.useEffect(() => {
    getFileQuery(profilePictureData?.id.toString())
      .then((res) => {
        setProfileUrl(res);
      })
      .catch(() => {
        toast.error('failed to get profile picture', { id: 'profile-error' });
      });
  }, [profilePictureData]);

  React.useEffect(() => {
    getFileQuery(idCardData?.id.toString())
      .then((res) => {
        setIdCardUrl(res);
      })
      .catch(() => {
        toast.error('failed to get id card', { id: 'id-card-error' });
      });
  }, [idCardData]);

  //#endregion  //*======== Query ===========

  //#region  //*=========== Mutation ===========
  const { mutateAsync: updateProfile, isLoading: isUpdateProfileLoading } =
    useUpdateProfileMutation();

  //#endregion  //*======== Mutation ===========

  //#region  //*=========== Form ===========
  const methods = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: {
      address: user?.address,
      birth_place: user?.birth_info.split(',')[0],
      birth_date: user?.birth_info.split(',')[1],
      phone_number: user?.phone_number.slice(2, user.phone_number.length),
      gender: user?.gender,
      name: user?.name,
      nationality: user?.nationality,
      username: user?.username,
      religion: user?.religion,
    },
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: RegisterForm) => {
    logger({ data }, 'rhf.tsx line 33');
    updateProfile({
      name: data.name,
      username: data.username,
      address: data.address,
      birth_info: `${data.birth_place}, ${data.birth_date}`,
      gender: data.gender,
      phone_number: `62${data.phone_number.toString()}`,
      nationality: data.nationality,
      religion: data.religion,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: [`/profile`],
      });

      setIsEdit(false);
      router.reload();
    });

    return;
  };
  //#endregion  //*======== Form Submit ===========

  const handleEditChange = () => {
    if (isEdit) {
      reset();
    }
    setIsEdit((prev) => !prev);
  };

  return (
    <DashboardLayout>
      <Seo templateTitle='Profile' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen'>
            <div className='flex items-end justify-between'>
              <div className='space-y-1'>
                <Typography variant='h1'>Profile</Typography>
                <Typography variant='c1' color='tertiary'>
                  See or update your profile
                </Typography>
              </div>
              <div className='flex items-center gap-x-2'>
                {isEdit && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        className='rounded-full text-amber-300'
                        iconClassName='w-5 h-5'
                        icon={HelpCircle}
                      />
                    </PopoverTrigger>
                    <PopoverContent side='top'>
                      Leaving edit mode will discard your changes.
                    </PopoverContent>
                  </Popover>
                )}
                <Typography variant='b2' color={!isEdit ? 'secondary' : 'base'}>
                  Edit Mode
                </Typography>
                <Switch
                  checked={isEdit}
                  onChange={handleEditChange}
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
                    } pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
            <hr className='my-2 w-full' />
            <div>
              <div className='mt-4 space-y-4'>
                <div className='flex w-full flex-col items-center justify-center gap-4 lg:flex-row'>
                  <UploadProfileModal>
                    {({ openModal }) => (
                      <button
                        type='button'
                        onClick={openModal}
                        className={clsx([
                          'group h-52 w-52 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary-600 bg-cover bg-center bg-no-repeat',
                        ])}
                        style={{
                          backgroundImage:
                            isProfilePictureLoading || !profilePictureData
                              ? `url(/images/taobal.gif)`
                              : `url(${profileUrl})`,
                        }}
                      >
                        <div className='hidden h-full w-full items-center justify-center rounded-full bg-black/50 group-hover:flex'>
                          <Edit2 size={50} className='w-full' />
                        </div>
                      </button>
                    )}
                  </UploadProfileModal>
                  <UploadIdCardModal>
                    {({ openModal }) => (
                      <button
                        type='button'
                        onClick={openModal}
                        className={clsx([
                          'group m-2 aspect-video w-full max-w-sm overflow-hidden rounded-lg border-2 border-primary-600 bg-cover bg-center bg-no-repeat',
                        ])}
                        style={{
                          backgroundImage:
                            isIdCardLoading || !idCardData
                              ? `url(/images/tao-card.jpg)`
                              : `url(${idCardUrl})`,
                        }}
                      >
                        <div className='hidden aspect-video h-full w-full items-center justify-center bg-black/50 group-hover:flex'>
                          <Edit2 size={50} className='w-full' />
                        </div>
                      </button>
                    )}
                  </UploadIdCardModal>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid-cols-2 gap-x-6 space-y-3 md:grid md:space-y-0'>
                      <div className='space-y-3'>
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
                      </div>

                      <div className='space-y-3'>
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

                        {/* <hr />
                        {isEdit && (
                          <>
                            <Typography variant='s3'>
                              Change Password
                            </Typography>
                            <PasswordInput
                              id='password_'
                              label='New Password'
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
                              label='Confirm New Password'
                              validation={{
                                required: 'Confirm Password must be filled',
                                validate: (value) =>
                                  value === methods.getValues('password_') ||
                                  'Confirmation passwords do not match with password',
                              }}
                              placeholder='Re-enter your password'
                            />
                          </>
                        )} */}
                      </div>
                    </div>
                    {isEdit && (
                      <div className='flex w-full justify-end'>
                        <Button
                          className='mt-2 sm:w-fit'
                          type='submit'
                          isLoading={isUpdateProfileLoading}
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

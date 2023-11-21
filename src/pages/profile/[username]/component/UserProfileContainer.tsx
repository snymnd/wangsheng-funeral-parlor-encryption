import clsx from 'clsx';
import * as React from 'react';
import toast from 'react-hot-toast';

import { getFileQuery, useGetFileByTypeQuery } from '@/hooks/query/file';

import Typography from '@/components/typography/Typography';

import UserFiles from '@/pages/profile/[username]/component/UserFiles';
import ValueField from '@/pages/profile/[username]/component/ValueField';

import { UserResponse } from '@/types/entities/user';

type UserProfileContainerProps = {
  user: UserResponse;
} & React.ComponentPropsWithoutRef<'main'>;
export default function UserProfileContainer({
  user,
  ...rest
}: UserProfileContainerProps) {
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>(
    undefined
  );
  const [idCardUrl, setIdCardUrl] = React.useState<string | undefined>(
    undefined
  );

  //#region  //*=========== Query ===========
  const { data: profilePicture, isLoading: isProfilePictureLoading } =
    useGetFileByTypeQuery(user.username, 'profile_picture');
  const profilePictureData =
    profilePicture?.data?.[profilePicture.data.length - 1];

  const { data: idCard, isLoading: isIdCardLoading } = useGetFileByTypeQuery(
    user.username,
    'id_card'
  );
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

  return (
    <main {...rest}>
      <section className='py-10'>
        <div className='layout min-h-screen'>
          <div className='flex items-end justify-between'>
            <div className='space-y-1'>
              <Typography variant='h1'>{user.username}'s Profile</Typography>
              <Typography variant='c1' color='tertiary'>
                See theirs legacy
              </Typography>
            </div>
          </div>
          <hr className='my-2 w-full' />
          <div>
            <div className='mt-4 space-y-4'>
              <div className='flex w-full flex-col items-center justify-center gap-4 lg:flex-row'>
                <div
                  className={clsx([
                    'group h-52 w-52 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary-600 bg-cover bg-center bg-no-repeat',
                  ])}
                  style={{
                    backgroundImage:
                      isProfilePictureLoading || !profilePictureData
                        ? `url(/images/taobal.gif)`
                        : `url(${profileUrl})`,
                  }}
                ></div>
                <div
                  className={clsx([
                    'group m-2 aspect-video w-full max-w-sm overflow-hidden rounded-lg border-2 border-primary-600 bg-cover bg-center bg-no-repeat',
                  ])}
                  style={{
                    backgroundImage:
                      isIdCardLoading || !idCardData
                        ? `url(/images/tao-card.jpg)`
                        : `url(${idCardUrl})`,
                  }}
                ></div>
              </div>
              <div>
                <div className='grid-cols-2 gap-x-6 space-y-3 md:grid md:space-y-0'>
                  <div className='space-y-4'>
                    <ValueField label='Name' value={user?.name} />
                    <ValueField label='Username' value={user?.username} />
                    <ValueField label='Email' value={user?.email} />
                    <ValueField label='Gender' value={user?.gender} />
                    <ValueField
                      label='Birth Information'
                      value={`${user?.birth_info}`}
                    />
                  </div>

                  <div className='space-y-4'>
                    <ValueField label='Religion' value={user?.religion} />
                    <ValueField label='Nationality' value={user?.nationality} />
                    <ValueField
                      label='Phone Number'
                      value={'+' + user?.phone_number}
                    />
                    <ValueField label='Address' value={user?.address} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className='my-2 mt-8 w-full' />
          <UserFiles />
        </div>
      </section>
    </main>
  );
}

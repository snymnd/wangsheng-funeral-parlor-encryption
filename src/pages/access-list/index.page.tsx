import * as React from 'react';
import { FiSearch } from 'react-icons/fi';

import { useGetNotificationQuery } from '@/hooks/query/access';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import AccessListItem from '@/pages/access-list/component/AccessListItem';
import ReqAccessModal from '@/pages/access-list/component/ReqAccessModal';

export default withAuth(AccessListPage, ['USER']);
function AccessListPage() {
  //#region  //*=========== Query ===========
  const { data: notification, isLoading: notificationLoading } =
    useGetNotificationQuery('profile', 'dir=0');
  const notifiactionData = notification?.data;
  //#endregion  //*======== Query ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Access List' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen'>
            <div className='flex items-end'>
              <div className='space-y-1'>
                <Typography variant='h1'>Access List</Typography>
                <Typography variant='c1' color='tertiary'>
                  Only the authorized access that allow to seek the legacy
                </Typography>
              </div>
            </div>

            <div className='mt-8'>
              <div className='flex justify-between'>
                <ReqAccessModal>
                  {({ openModal }) => (
                    <Button onClick={openModal}>Request Access</Button>
                  )}
                </ReqAccessModal>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <FiSearch className='text-xl text-typo' />
                  </div>
                </div>
              </div>
              <hr className='my-4 border-base-600' />
              <div className='space-y-3'>
                {!notificationLoading ? (
                  notifiactionData && notifiactionData.length > 0 ? (
                    notifiactionData.map((request) => (
                      <AccessListItem request={request} key={request.id} />
                    ))
                  ) : (
                    <Typography variant='b1' color='tertiary'>
                      No access found for Now
                    </Typography>
                  )
                ) : (
                  <Typography variant='b1' color='tertiary'>
                    Loading...
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

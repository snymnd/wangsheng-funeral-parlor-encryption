import * as React from 'react';

import { useGetNotificationQuery } from '@/hooks/query/access';

import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import NotificationListItem from '@/pages/notification/component/NotificationListItem';

export default withAuth(NotificationPage, ['USER']);
function NotificationPage() {
  //#region  //*=========== query ===========
  const { data: notification } = useGetNotificationQuery('dir=1&status=0');
  const notifiactionData = notification?.data;
  //#endregion  //*======== query ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Notification' />

      <main>
        <section className='py-10'>
          <div className='layout min-h-screen'>
            <div className='flex items-end'>
              <div className='space-y-1'>
                <Typography variant='h1'>Notification</Typography>
                <Typography variant='c1' color='tertiary'>
                  Your journey, your desition
                </Typography>
              </div>
            </div>

            <div className='mt-8'>
              <hr className='my-4 border-base-600' />
              <div className='space-y-3'>
                {notifiactionData && notifiactionData.length > 0 ? (
                  notifiactionData.map((request) => (
                    <NotificationListItem request={request} key={request.id} />
                  ))
                ) : (
                  <Typography variant='b1' color='tertiary'>
                    No notification found for Now
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

import { useRouter } from 'next/router';
import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';

import InsertKeyModal from '@/pages/profile/[username]/component/InsertKeyModal';
export default withAuth(SeekProfilePage, ['USER']);
// export default
function SeekProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <DashboardLayout>
      <Seo templateTitle={`${username}'s Profile`} />
      <InsertKeyModal username={username as string} />
    </DashboardLayout>
  );
}

import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function BaseLayoutPage() {
  return (
    <Layout>
      <Seo templateTitle='Base Layout' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'></div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}

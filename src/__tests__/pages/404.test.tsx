import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404.page';

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/tidak ditemukan/i);

    expect(heading).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import HomePage from './HomePage';

// ==================================================

describe('HomePage', () => {
  it('renders.', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains correct links.', () => {
    // Act
    const { getByText } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('Registration Page')).toBeVisible();
    expect(getByText('Admin Page')).toBeVisible();
  });
});

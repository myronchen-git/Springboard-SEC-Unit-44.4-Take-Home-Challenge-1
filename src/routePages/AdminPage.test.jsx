import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserContext } from '../contexts.jsx';
import AdminPage from './AdminPage';

// ==================================================

describe('AdminPage', () => {
  const users = Object.freeze([
    Object.freeze({
      id: 1,
      firstName: 'First Name 1',
      lastName: 'Last Name 1',
      email: 'email1@email.com',
    }),
    Object.freeze({
      id: 2,
      firstName: 'First Name 2',
      lastName: 'Last Name 2',
      email: 'email2@email.com',
    }),
  ]);

  const mockGetUsers = vi.fn();

  beforeEach(() => {
    mockGetUsers.mockReset();
    mockGetUsers.mockResolvedValue(users);
  });

  it('renders.', async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ getUsers: mockGetUsers }}>
          <AdminPage />
        </UserContext.Provider>
      )
    );
  });

  it('matches snapshot.', async () => {
    const { asFragment } = await act(async () =>
      render(
        <UserContext.Provider value={{ getUsers: mockGetUsers }}>
          <AdminPage />
        </UserContext.Provider>
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('lists all users.', async () => {
    // Act
    const { getByText } = await act(async () =>
      render(
        <UserContext.Provider value={{ getUsers: mockGetUsers }}>
          <AdminPage />
        </UserContext.Provider>
      )
    );

    // Assert
    for (const user of users) {
      for (const userInfo of Object.values(user)) {
        expect(getByText(userInfo)).toBeVisible();
      }
    }
  });
});

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import BackendApi from './api.js';
import App from './App.jsx';

import { users as userAccounts } from './_testCommon.js';

// ==================================================

vi.mock(import('./api.js'), () => {
  const mockBackendApi = vi.fn();
  mockBackendApi.postUser = vi.fn();
  mockBackendApi.getUsers = vi.fn();

  return { default: mockBackendApi };
});

// ==================================================

describe('App', () => {
  const newAccount = Object.freeze({
    firstName: 'First',
    lastName: 'Last',
    email: 'email@email.com',
  });

  beforeEach(() => {
    BackendApi.postUser.mockReset();
    BackendApi.getUsers.mockReset();

    BackendApi.postUser.mockResolvedValue(newAccount);
    BackendApi.getUsers.mockResolvedValue(userAccounts);
  });

  it('navigates to sign up page.', async () => {
    // Arrange
    const user = userEvent.setup();

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Act
    await user.click(getByText('Registration Page'));

    // Assert
    expect(getByLabelText('First Name')).toBeVisible();
    expect(getByLabelText('Last Name')).toBeVisible();
    expect(getByLabelText('Email')).toBeVisible();
  });

  it('navigates to admin page.', async () => {
    // Arrange
    const user = userEvent.setup();

    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Act
    await user.click(getByText('Admin Page'));

    // Assert
    userAccounts.forEach((userAccount) => {
      expect(getByText(userAccount.email)).toBeVisible();
    });
  });

  it('signs up a new user.', async () => {
    // Arrange
    const user = userEvent.setup();

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(getByText('Registration Page'));

    // Act
    await user.click(getByLabelText('First Name'));
    await user.keyboard(newAccount.firstName);
    await user.click(getByLabelText('Last Name'));
    await user.keyboard(newAccount.lastName);
    await user.click(getByLabelText('Email'));
    await user.keyboard(newAccount.email);

    await user.click(getByText('Submit'));

    // Assert
    expect(getByText('Yodlr Design Challenge')).toBeVisible();

    expect(BackendApi.postUser).toHaveBeenCalledOnce();
    expect(BackendApi.postUser).toHaveBeenCalledWith(newAccount);
  });
});

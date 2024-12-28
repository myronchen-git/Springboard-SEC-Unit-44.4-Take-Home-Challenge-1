import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserContext } from '../contexts.jsx';
import SignupPage from './SignupPage.jsx';

// ==================================================

vi.mock('react-router-dom');

// ==================================================

describe('SignupPage', () => {
  const newData = Object.freeze({
    firstName: 'First',
    lastName: 'Last',
    email: 'email@email.com',
  });

  const mockSignup = vi.fn();
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate);

  beforeEach(() => {
    mockSignup.mockReset();
    mockNavigate.mockReset();
  });

  it('renders.', () => {
    render(
      <UserContext.Provider value={{ signup: mockSignup }}>
        <SignupPage />
      </UserContext.Provider>
    );
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ signup: mockSignup }}>
        <SignupPage />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can update form data.', async () => {
    // Arrange
    const user = userEvent.setup();

    const { getByLabelText } = render(
      <UserContext.Provider value={{ signup: mockSignup }}>
        <SignupPage />
      </UserContext.Provider>
    );

    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');

    // Act
    await user.click(firstNameInput);
    await user.keyboard(newData.firstName);
    await user.click(lastNameInput);
    await user.keyboard(newData.lastName);
    await user.click(emailInput);
    await user.keyboard(newData.email);

    // Assert
    expect(firstNameInput).toHaveValue(newData.firstName);
    expect(lastNameInput).toHaveValue(newData.lastName);
    expect(emailInput).toHaveValue(newData.email);

    expect(mockSignup).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('can submit form data.', async () => {
    // Arrange
    const user = userEvent.setup();

    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={{ signup: mockSignup }}>
        <SignupPage />
      </UserContext.Provider>
    );

    await user.click(getByLabelText('First Name'));
    await user.keyboard(newData.firstName);
    await user.click(getByLabelText('Last Name'));
    await user.keyboard(newData.lastName);
    await user.click(getByLabelText('Email'));
    await user.keyboard(newData.email);

    const submitBtn = getByText('Submit');

    // Act
    await user.click(submitBtn);

    // Assert
    expect(mockSignup).toHaveBeenCalledOnce();
    expect(mockSignup).toHaveBeenCalledWith(newData);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays an error message if there is an issue when signing up.', async () => {
    // Arrange
    const errorMessage = 'error';
    mockSignup.mockRejectedValue({ message: errorMessage });

    const user = userEvent.setup();

    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={{ signup: mockSignup }}>
        <SignupPage />
      </UserContext.Provider>
    );

    await user.click(getByLabelText('First Name'));
    await user.keyboard(newData.firstName);
    await user.click(getByLabelText('Last Name'));
    await user.keyboard(newData.lastName);
    await user.click(getByLabelText('Email'));
    await user.keyboard(newData.email);

    const submitBtn = getByText('Submit');

    // Act
    await user.click(submitBtn);

    // Assert
    expect(getByText(errorMessage)).toBeVisible();

    expect(mockSignup).toHaveBeenCalledOnce();
    expect(mockSignup).toHaveBeenCalledWith(newData);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

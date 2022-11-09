
import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import EsmCJSIssueButton from './esm-cjs-issue';

describe('ESMDirectImport will not work', () => {
  test('should render button', () => {
    render(<EsmCJSIssueButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  });
});
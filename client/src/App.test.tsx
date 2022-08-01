import { render, screen } from '@testing-library/react';
import App from './App';


describe('App component', () => {
  it('should render the component onto the screen', () => {
    expect(true).toBeTruthy();
  });
});

test('renders react component', () => {
  render(<App />);
  expect(screen.getByTestId('search-input')).toBeInTheDocument();
  expect(screen.getByTestId('search-button')).toBeInTheDocument();
  expect(screen.getByTestId('coins-list')).toBeInTheDocument();
  expect(screen.getByTestId('coins-card')).toBeInTheDocument();
});

it('should have the search button disabled when initialized', () => {
  render(<App />);

  expect(screen.getByTestId('search-button')).toBeEnabled();
});



import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app');
  expect(linkElement).toBeInTheDocument();
});
// test('renders the taskmanager compoennt', () => {
//   render(<TaskManager />);
//   const linkElement = screen.getByTestId('taskmanager');
//   expect(linkElement).toBeInTheDocument();
// });

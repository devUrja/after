import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer'

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn().mockReturnValue(null),
    unobserve: jest.fn().mockReturnValue(null),
    disconnect: jest.fn().mockReturnValue(null)
  })
  window.IntersectionObserver = mockIntersectionObserver
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})


test('navbar is getting rendered properly with application name', () => {
  render(<App />)
  const linkElement = screen.getByText(/Posts/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders App correctly', () => {
  const domTree = renderer.create(<App />).toJSON()
  expect(domTree).toMatchSnapshot()
})
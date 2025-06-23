import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BoomerangButton } from './BoomerangButton';

describe('BoomerangButton', () => {
  const defaultProps = {
    tip: ['Initial tip', 'Clicked tip'] as [string, string],
    content: ['Initial content', 'Clicked content'],
    handleClick: jest.fn(),
  };

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Suppress act warnings for timer-based state updates
    consoleSpy = jest.spyOn(console, 'error').mockImplementation((message) => {
      if (!message.includes('act(...)')) {
        console.warn(message);
      }
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    consoleSpy.mockRestore();
  });

  it('renders with initial content and tip', () => {
    render(<BoomerangButton {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Initial tip')).toBeInTheDocument();
    expect(screen.getByText('Initial content')).toBeInTheDocument();
  });

  it('applies default tip position class', () => {
    render(<BoomerangButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('tsx-cmpnt-boomerang-position-top');
  });

  it('applies custom tip position class', () => {
    render(<BoomerangButton {...defaultProps} tipPosition="bottom" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('tsx-cmpnt-boomerang-position-bottom');
  });

  it('applies custom className along with default classes', () => {
    render(<BoomerangButton {...defaultProps} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('tsx-cmpnt-boomerang-btn');
    expect(button).toHaveClass('tsx-cmpnt-boomerang-position-top');
    expect(button).toHaveClass('custom-class');
  });

  it('calls handleClick when clicked and shows clicked state', () => {
    render(<BoomerangButton {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Clicked tip')).toBeInTheDocument();
    expect(screen.getByText('Clicked content')).toBeInTheDocument();
  });

  it('reverts to initial state after delay', async () => {
    render(<BoomerangButton {...defaultProps} delay={500} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should show clicked state immediately
    expect(screen.getByText('Clicked tip')).toBeInTheDocument();
    expect(screen.getByText('Clicked content')).toBeInTheDocument();

    // Fast forward time by delay amount
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should revert to initial state
    await waitFor(() => {
      expect(screen.getByText('Initial tip')).toBeInTheDocument();
      expect(screen.getByText('Initial content')).toBeInTheDocument();
    });
  });

  it('ignores subsequent clicks while in clicked state', () => {
    render(<BoomerangButton {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(defaultProps.handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses custom delay value', async () => {
    render(<BoomerangButton {...defaultProps} delay={1000} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Clicked tip')).toBeInTheDocument();

    // Should still be in clicked state after 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Clicked tip')).toBeInTheDocument();

    // Should revert after full 1000ms delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    await waitFor(() => {
      expect(screen.getByText('Initial tip')).toBeInTheDocument();
    });
  });

  it('passes through additional attributes', () => {
    render(
      <BoomerangButton {...defaultProps} data-testid="boomerang-btn" aria-label="Custom button" />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-testid', 'boomerang-btn');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
  });

  it('renders tip text in correct span element', () => {
    render(<BoomerangButton {...defaultProps} />);

    const tipElement = screen.getByText('Initial tip');
    expect(tipElement).toHaveClass('tsx-cmpnt-boomerang-btn-tip-text');
    expect(tipElement.tagName).toBe('SPAN');
  });

  it('works with all tip positions', () => {
    const positions = ['top', 'right', 'bottom', 'left'] as const;

    positions.forEach((position) => {
      const { container } = render(<BoomerangButton {...defaultProps} tipPosition={position} />);

      const button = container.querySelector('button');
      expect(button).toHaveClass(`tsx-cmpnt-boomerang-position-${position}`);
    });
  });

  it('handles undefined handleClick gracefully', () => {
    const propsWithoutHandler = {
      tip: ['Initial tip', 'Clicked tip'] as [string, string],
      content: ['Initial content', 'Clicked content'],
      handleClick: undefined as any,
    };

    expect(() => {
      render(<BoomerangButton {...propsWithoutHandler} />);
    }).not.toThrow();

    const button = screen.getByRole('button');
    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
  });
});

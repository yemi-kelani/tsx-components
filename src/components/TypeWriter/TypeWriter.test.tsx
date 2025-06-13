import { render, screen, act } from '@testing-library/react';
import { TypeWriter } from './TypeWriter';

describe('TypeWriter', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    // Suppress act warnings for timer-based animations
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

  it('renders container with correct class', () => {
    const { container } = render(<TypeWriter terms={['hello']} />);
    
    const typewriterContainer = container.firstChild as HTMLElement;
    expect(typewriterContainer).toHaveClass('tsx-cmpnt-typewriter-container');
  });

  it('applies custom className', () => {
    const { container } = render(<TypeWriter terms={['hello']} className="custom-class" />);
    
    const typewriterContainer = container.firstChild as HTMLElement;
    expect(typewriterContainer).toHaveClass('tsx-cmpnt-typewriter-container');
    expect(typewriterContainer).toHaveClass('custom-class');
  });

  it('displays cursor by default', () => {
    render(<TypeWriter terms={['hello']} />);
    
    const cursor = document.querySelector('.tsx-cmpnt-typewriter-cursor');
    expect(cursor).toBeInTheDocument();
  });

  it('hides cursor when cursor prop is false', () => {
    render(<TypeWriter terms={['hello']} cursor={false} />);
    
    const cursor = document.querySelector('.tsx-cmpnt-typewriter-cursor');
    expect(cursor).not.toBeInTheDocument();
  });

  it('applies custom color to text', () => {
    render(<TypeWriter terms={['hello']} color="red" />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    expect(textElement).toHaveStyle({ color: 'red' });
  });

  it('starts typing the first term', () => {
    render(<TypeWriter terms={['hello']} speed={100} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    expect(textElement).toHaveTextContent('');
    
    // Advance time to start typing
    act(() => {
      jest.advanceTimersByTime(10); // 1000/100 = 10ms interval
    });
    
    expect(textElement).toHaveTextContent('h');
    
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    expect(textElement).toHaveTextContent('he');
  });

  it('completes typing a full term', () => {
    render(<TypeWriter terms={['hi']} speed={100} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    
    // Advance through full typing sequence
    act(() => {
      jest.advanceTimersByTime(10); // h
    });
    expect(textElement).toHaveTextContent('h');
    
    act(() => {
      jest.advanceTimersByTime(10); // hi
    });
    expect(textElement).toHaveTextContent('hi');
  });

  it('handles empty terms array', () => {
    render(<TypeWriter terms={[]} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    expect(textElement).toHaveTextContent('');
  });

  it('skips empty strings in terms array', () => {
    render(<TypeWriter terms={['', 'hello']} speed={100} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    
    // Should skip empty string and start with 'hello'
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    expect(textElement).toHaveTextContent('h');
  });

  it('uses different speed values correctly', () => {
    const { rerender } = render(<TypeWriter terms={['a']} speed={10} />);
    
    // Speed 10 should have 100ms interval (1000/10)
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    let textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    expect(textElement).toHaveTextContent('a');
    
    // Test with higher speed
    rerender(<TypeWriter terms={['b']} speed={100} />);
    
    // Speed 100 should have 10ms interval (1000/100)
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    expect(textElement).toHaveTextContent('b');
  });

  it('handles loop=false correctly', () => {
    render(<TypeWriter terms={['test']} loop={false} speed={100} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    
    // Complete typing the term
    act(() => {
      jest.advanceTimersByTime(40); // 4 characters * 10ms
    });
    
    expect(textElement).toHaveTextContent('test');
    
    // Wait for delay period
    act(() => {
      jest.advanceTimersByTime(2000); // default delay is 2 seconds
    });
    
    // Should still show 'test' and cursor should be hidden
    expect(textElement).toHaveTextContent('test');
    const cursor = document.querySelector('.tsx-cmpnt-typewriter-cursor');
    expect(cursor).not.toBeInTheDocument();
  });

  it('processes multiple terms with loop=true', () => {
    render(<TypeWriter terms={['hi', 'bye']} loop={true} speed={100} delay={1} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    
    // Type first term
    act(() => {
      jest.advanceTimersByTime(20); // 'hi' = 2 chars * 10ms
    });
    expect(textElement).toHaveTextContent('hi');
    
    // Wait for delay
    act(() => {
      jest.advanceTimersByTime(1000); // 1 second delay
    });
    
    // Should start erasing
    act(() => {
      jest.advanceTimersByTime(20); // Erase 'hi'
    });
    expect(textElement).toHaveTextContent('');
    
    // Should start typing second term
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(textElement).toHaveTextContent('b');
  });

  it('passes through additional attributes', () => {
    render(
      <TypeWriter 
        terms={['test']} 
        data-testid="typewriter"
        aria-label="Typing animation"
      />
    );
    
    const container = screen.getByTestId('typewriter');
    expect(container).toHaveAttribute('aria-label', 'Typing animation');
  });

  it('handles custom delay values', () => {
    render(<TypeWriter terms={['test']} speed={100} delay={5} />);
    
    const textElement = document.querySelector('.tsx-cmpnt-typewriter-text');
    
    // Complete typing
    act(() => {
      jest.advanceTimersByTime(40); // 4 chars * 10ms
    });
    expect(textElement).toHaveTextContent('test');
    
    // Custom delay should be 5 seconds (5000ms)
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Should start erasing after custom delay
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(textElement).toHaveTextContent('tes');
  });

  it('maintains cursor visibility during typing', () => {
    render(<TypeWriter terms={['hello']} cursor={true} />);
    
    const cursor = document.querySelector('.tsx-cmpnt-typewriter-cursor');
    expect(cursor).toBeInTheDocument();
    
    // Cursor should remain visible during typing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(cursor).toBeInTheDocument();
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(<TypeWriter terms={['test']} />);
    
    // Start some timers
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    // Should not throw errors when unmounting
    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
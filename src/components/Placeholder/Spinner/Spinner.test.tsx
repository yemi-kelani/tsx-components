import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toBeInTheDocument();
    expect(spinner.tagName).toBe('DIV');
    expect(spinner).toHaveClass('tsx-cmpnt-spinner');
  });

  it('applies custom styles', () => {
    const customStyle = {
      color: 'red',
      fontSize: '20px',
      width: '50px',
      height: '50px',
    };

    const { container } = render(<Spinner style={customStyle} />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveStyle({
      color: 'red',
      fontSize: '20px',
      width: '50px',
      height: '50px',
    });
  });

  it('handles empty style object', () => {
    const { container } = render(<Spinner style={{}} />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('tsx-cmpnt-spinner');
  });

  it('uses default empty style when no style provided', () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('tsx-cmpnt-spinner');
  });

  it('maintains className regardless of style props', () => {
    const { container: container1 } = render(<Spinner />);
    const { container: container2 } = render(<Spinner style={{ color: 'blue' }} />);

    const spinner1 = container1.firstChild as HTMLElement;
    const spinner2 = container2.firstChild as HTMLElement;

    expect(spinner1).toHaveClass('tsx-cmpnt-spinner');
    expect(spinner2).toHaveClass('tsx-cmpnt-spinner');
  });

  it('applies multiple style properties correctly', () => {
    const complexStyle = {
      backgroundColor: 'blue',
      border: '2px solid red',
      borderRadius: '50%',
      padding: '10px',
      margin: '5px',
      display: 'inline-block',
    };

    const { container } = render(<Spinner style={complexStyle} />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveStyle(complexStyle);
  });

  it('handles undefined style gracefully', () => {
    const { container } = render(<Spinner style={undefined} />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('tsx-cmpnt-spinner');
  });

  it('renders as a div element', () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner.tagName).toBe('DIV');
  });

  it('is self-closing element with no children', () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner.children).toHaveLength(0);
    expect(spinner.textContent).toBe('');
  });

  it('applies CSS animation styles correctly', () => {
    const animationStyle = {
      animation: 'spin 1s linear infinite',
      transform: 'rotate(45deg)',
    };

    const { container } = render(<Spinner style={animationStyle} />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveStyle(animationStyle);
  });

  it('handles size-related styles', () => {
    const sizeStyles = [
      { width: '16px', height: '16px' }, // Small
      { width: '24px', height: '24px' }, // Medium
      { width: '32px', height: '32px' }, // Large
    ];

    sizeStyles.forEach((style) => {
      const { container } = render(<Spinner style={style} />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle(style);
    });
  });

  it('handles color variations', () => {
    const colors = ['red', 'blue', 'green', '#ff0000', 'rgb(255, 0, 0)', 'transparent'];

    colors.forEach((color) => {
      const { container } = render(<Spinner style={{ color }} />);
      const spinner = container.firstChild as HTMLElement;
      expect(spinner).toHaveStyle({ color });
    });
  });

  it('combines with CSS classes correctly', () => {
    const { container } = render(
      <div className="parent-container">
        <Spinner style={{ margin: '10px' }} />
      </div>,
    );

    const parent = container.firstChild as HTMLElement;
    const spinner = parent.firstChild as HTMLElement;

    expect(parent).toHaveClass('parent-container');
    expect(spinner).toHaveClass('tsx-cmpnt-spinner');
    expect(spinner).toHaveStyle({ margin: '10px' });
  });
});

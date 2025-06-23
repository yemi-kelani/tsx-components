import { render, screen } from '@testing-library/react';
import { LoadingPlaceholder } from './LoadingPlaceholder';

// Mock the Spinner component
jest.mock('../Spinner/Spinner', () => ({
  Spinner: (props: any) => (
    <div data-testid="spinner" {...props}>
      Spinner Component
    </div>
  ),
}));

// Mock the Placeholder component
jest.mock('../Placeholder', () => ({
  Placeholder: ({ children, as = 'span', animate, style, ...props }: any) => {
    const Tag = as;
    return (
      <Tag data-testid="placeholder" data-animate={animate} style={style} {...props}>
        {children}
      </Tag>
    );
  },
}));

describe('LoadingPlaceholder', () => {
  it('renders with default props', () => {
    render(<LoadingPlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder.tagName).toBe('SPAN');
    expect(placeholder).toHaveAttribute('data-animate', 'true');
  });

  it('renders default Spinner icon', () => {
    render(<LoadingPlaceholder />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Spinner Component');
  });

  it('renders custom icon when provided', () => {
    const customIcon = <div data-testid="custom-icon">Custom Loading Icon</div>;
    render(<LoadingPlaceholder icon={customIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('Custom Loading Icon')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('applies correct size styles for small', () => {
    render(<LoadingPlaceholder size="small" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '300px',
    });
  });

  it('applies correct size styles for medium (default)', () => {
    render(<LoadingPlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '450px',
    });
  });

  it('applies correct size styles for large', () => {
    render(<LoadingPlaceholder size="large" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '600px',
    });
  });

  it('uses custom style when provided instead of size styles', () => {
    const customStyle = { width: '400px', height: '200px', backgroundColor: 'blue' };
    render(<LoadingPlaceholder size="large" style={customStyle} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle(customStyle);
  });

  it('renders with custom HTML tag', () => {
    render(<LoadingPlaceholder as="div" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder.tagName).toBe('DIV');
  });

  it('applies animation by default', () => {
    render(<LoadingPlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('data-animate', 'true');
  });

  it('disables animation when animate is false', () => {
    render(<LoadingPlaceholder animate={false} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('data-animate', 'false');
  });

  it('passes through additional attributes', () => {
    render(
      <LoadingPlaceholder aria-label="Content loading placeholder" id="loading-placeholder" />,
    );

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('aria-label', 'Content loading placeholder');
    expect(placeholder).toHaveAttribute('id', 'loading-placeholder');
  });

  it('handles all size options correctly', () => {
    const sizes = [
      { size: 'small' as const, expectedHeight: '300px' },
      { size: 'medium' as const, expectedHeight: '450px' },
      { size: 'large' as const, expectedHeight: '600px' },
    ];

    sizes.forEach(({ size, expectedHeight }) => {
      const { container } = render(<LoadingPlaceholder size={size} />);
      const placeholder = container.querySelector('[data-testid="placeholder"]');
      expect(placeholder).toHaveStyle({ height: expectedHeight });
    });
  });

  it('works with different HTML tags', () => {
    const tags = ['div', 'article', 'section', 'main'] as const;

    tags.forEach((tag) => {
      const { container } = render(<LoadingPlaceholder as={tag} />);
      const placeholder = container.querySelector('[data-testid="placeholder"]');
      expect(placeholder?.tagName).toBe(tag.toUpperCase());
    });
  });

  it('prioritizes custom style over size when both provided', () => {
    const customStyle = { height: '888px', width: '777px' };
    render(<LoadingPlaceholder size="small" style={customStyle} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle(customStyle);
  });

  it('handles undefined size gracefully', () => {
    render(<LoadingPlaceholder size={undefined} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('uses empty object as style when size is undefined and no style provided', () => {
    render(<LoadingPlaceholder size={undefined} />);

    const placeholder = screen.getByTestId('placeholder');
    // When size is undefined, should not have specific size styles
    expect(placeholder).toBeInTheDocument();
  });

  it('renders custom ReactNode icon correctly', () => {
    const customIcon = (
      <div>
        <span>Loading...</span>
        <div className="custom-spinner" />
      </div>
    );

    render(<LoadingPlaceholder icon={customIcon} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(document.querySelector('.custom-spinner')).toBeInTheDocument();
  });

  it('handles null icon gracefully', () => {
    render(<LoadingPlaceholder icon={null} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('handles string icon gracefully', () => {
    render(<LoadingPlaceholder icon="Loading text..." />);

    expect(screen.getByText('Loading text...')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('maintains all placeholder functionality with custom icon', () => {
    const customIcon = <div data-testid="custom-loading">Custom</div>;
    render(
      <LoadingPlaceholder
        icon={customIcon}
        size="large"
        animate={false}
        as="section"
        className="custom-class"
      />,
    );

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder.tagName).toBe('SECTION');
    expect(placeholder).toHaveAttribute('data-animate', 'false');
    expect(placeholder).toHaveAttribute('class', 'custom-class');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '600px',
    });
    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
  });
});

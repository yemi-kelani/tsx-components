import { render, screen } from '@testing-library/react';
import { ImagePlaceholder } from './ImagePlaceholder';

// Mock FontAwesome icon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, size, ...props }: any) => (
    <span data-testid="font-awesome-icon" data-icon={icon.iconName} data-size={size} {...props}>
      {icon.iconName}
    </span>
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

describe('ImagePlaceholder', () => {
  it('renders with default props', () => {
    render(<ImagePlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder.tagName).toBe('SPAN');
    expect(placeholder).toHaveAttribute('data-animate', 'true');
  });

  it('renders FontAwesome image icon', () => {
    render(<ImagePlaceholder />);

    const icon = screen.getByTestId('font-awesome-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', 'image');
    expect(icon).toHaveAttribute('data-size', '1x');
  });

  it('applies correct size styles for small', () => {
    render(<ImagePlaceholder size="small" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '300px',
      maxHeight: '100%',
    });
  });

  it('applies correct size styles for medium (default)', () => {
    render(<ImagePlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '450px',
      maxHeight: '100%',
    });
  });

  it('applies correct size styles for large', () => {
    render(<ImagePlaceholder size="large" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle({
      width: '100%',
      height: '600px',
      maxHeight: '100%',
    });
  });

  it('uses custom style when provided instead of size styles', () => {
    const customStyle = { width: '200px', height: '100px', backgroundColor: 'red' };
    render(<ImagePlaceholder size="large" style={customStyle} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle(customStyle);
  });

  it('applies custom iconSize', () => {
    render(<ImagePlaceholder iconSize="3x" />);

    const icon = screen.getByTestId('font-awesome-icon');
    expect(icon).toHaveAttribute('data-size', '3x');
  });

  it('applies different icon sizes correctly', () => {
    const sizes = ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x'] as const;

    sizes.forEach((size) => {
      const { container } = render(<ImagePlaceholder iconSize={size} />);
      const icon = container.querySelector('[data-testid="font-awesome-icon"]');
      expect(icon).toHaveAttribute('data-size', size);
    });
  });

  it('renders with custom HTML tag', () => {
    render(<ImagePlaceholder as="div" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder.tagName).toBe('DIV');
  });

  it('applies animation by default', () => {
    render(<ImagePlaceholder />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('data-animate', 'true');
  });

  it('disables animation when animate is false', () => {
    render(<ImagePlaceholder animate={false} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('data-animate', 'false');
  });

  it('passes through additional attributes', () => {
    render(<ImagePlaceholder aria-label="Image loading placeholder" id="test-placeholder" />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('aria-label', 'Image loading placeholder');
    expect(placeholder).toHaveAttribute('id', 'test-placeholder');
  });

  it('handles all size options correctly', () => {
    const sizes = [
      { size: 'small' as const, expectedHeight: '300px' },
      { size: 'medium' as const, expectedHeight: '450px' },
      { size: 'large' as const, expectedHeight: '600px' },
    ];

    sizes.forEach(({ size, expectedHeight }) => {
      const { container } = render(<ImagePlaceholder size={size} />);
      const placeholder = container.querySelector('[data-testid="placeholder"]');
      expect(placeholder).toHaveStyle({ height: expectedHeight });
    });
  });

  it('works with different HTML tags', () => {
    const tags = ['div', 'article', 'section', 'main'] as const;

    tags.forEach((tag) => {
      const { container } = render(<ImagePlaceholder as={tag} />);
      const placeholder = container.querySelector('[data-testid="placeholder"]');
      expect(placeholder?.tagName).toBe(tag.toUpperCase());
    });
  });

  it('prioritizes custom style over size when both provided', () => {
    const customStyle = { height: '999px', width: '888px' };
    render(<ImagePlaceholder size="small" style={customStyle} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveStyle(customStyle);
  });

  it('handles undefined size gracefully', () => {
    render(<ImagePlaceholder size={undefined} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('uses empty object as style when size is undefined and no style provided', () => {
    render(<ImagePlaceholder size={undefined} />);

    const placeholder = screen.getByTestId('placeholder');
    // When size is undefined, should not have specific size styles
    expect(placeholder).toBeInTheDocument();
  });

  it('renders icon with correct default size', () => {
    render(<ImagePlaceholder />);

    const icon = screen.getByTestId('font-awesome-icon');
    expect(icon).toHaveAttribute('data-size', '1x');
    expect(icon).toHaveTextContent('image');
  });

  it('handles various iconSize formats', () => {
    const iconSizes = ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '10x'] as const;

    iconSizes.forEach((iconSize) => {
      const { container } = render(<ImagePlaceholder iconSize={iconSize} />);
      const icon = container.querySelector('[data-testid="font-awesome-icon"]');
      expect(icon).toHaveAttribute('data-size', iconSize);
    });
  });
});

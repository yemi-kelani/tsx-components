import { render, screen } from '@testing-library/react';
import { Placeholder } from './Placeholder';

// Mock the DynamicTag component
jest.mock('../DynamicTag/DynamicTag', () => ({
  DynamicTag: ({ as = 'div', children, ...props }: any) => {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  },
}));

describe('Placeholder', () => {
  it('renders with default props', () => {
    const { container } = render(<Placeholder />);
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SPAN'); // default 'as' prop
    expect(element).toHaveClass('tsx-cmpnt-placeholder');
    expect(element).toHaveClass('tsx-cmpnt-placeholder-shimmer-animator'); // default animate: true
  });

  it('applies correct size styles', () => {
    const { container } = render(<Placeholder size="small" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '100%',
      height: '300px',
      maxHeight: '100%',
    });
  });

  it('applies medium size styles by default', () => {
    const { container } = render(<Placeholder />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '100%',
      height: '450px',
      maxHeight: '100%',
    });
  });

  it('applies large size styles', () => {
    const { container } = render(<Placeholder size="large" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '100%',
      height: '600px',
      maxHeight: '100%',
    });
  });

  it('uses custom style when provided instead of size styles', () => {
    const customStyle = { width: '200px', height: '100px', backgroundColor: 'red' };
    const { container } = render(<Placeholder size="large" style={customStyle} />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle(customStyle);
    // Should not have the large size styles
    expect(element).not.toHaveStyle({ height: '600px' });
  });

  it('uses custom style when size is undefined', () => {
    const customStyle = { width: '150px', height: '75px' };
    const { container } = render(<Placeholder size={undefined} style={customStyle} />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle(customStyle);
  });

  it('applies shimmer animation class by default', () => {
    const { container } = render(<Placeholder />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('tsx-cmpnt-placeholder-shimmer-animator');
  });

  it('does not apply shimmer animation when animate is false', () => {
    const { container } = render(<Placeholder animate={false} />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('tsx-cmpnt-placeholder');
    expect(element).not.toHaveClass('tsx-cmpnt-placeholder-shimmer-animator');
  });

  it('renders with custom HTML tag', () => {
    const { container } = render(<Placeholder as="div" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('DIV');
  });

  it('renders children content', () => {
    render(
      <Placeholder>
        <span>Loading content...</span>
        <button>Cancel</button>
      </Placeholder>
    );
    
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('applies custom className along with default classes', () => {
    const { container } = render(<Placeholder className="custom-placeholder" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-placeholder');
    expect(element).toHaveClass('tsx-cmpnt-placeholder');
    expect(element).toHaveClass('tsx-cmpnt-placeholder-shimmer-animator');
  });

  it('handles empty className', () => {
    const { container } = render(<Placeholder className="" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('tsx-cmpnt-placeholder');
    expect(element).toHaveClass('tsx-cmpnt-placeholder-shimmer-animator');
  });

  it('passes through additional attributes', () => {
    const { container } = render(
      <Placeholder 
        data-testid="placeholder-component"
        aria-label="Loading placeholder"
        id="test-placeholder"
      />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'placeholder-component');
    expect(element).toHaveAttribute('aria-label', 'Loading placeholder');
    expect(element).toHaveAttribute('id', 'test-placeholder');
  });

  it('combines custom className with animation classes correctly', () => {
    const { container: animatedContainer } = render(
      <Placeholder className="my-class" animate={true} />
    );
    
    const animatedElement = animatedContainer.firstChild as HTMLElement;
    expect(animatedElement.className).toBe('my-class tsx-cmpnt-placeholder tsx-cmpnt-placeholder-shimmer-animator');
    
    const { container: notAnimatedContainer } = render(
      <Placeholder className="my-class" animate={false} />
    );
    
    const notAnimatedElement = notAnimatedContainer.firstChild as HTMLElement;
    expect(notAnimatedElement.className).toBe('my-class tsx-cmpnt-placeholder');
  });

  it('handles all size options correctly', () => {
    const sizes = [
      { size: 'small' as const, expectedHeight: '300px' },
      { size: 'medium' as const, expectedHeight: '450px' },
      { size: 'large' as const, expectedHeight: '600px' },
    ];
    
    sizes.forEach(({ size, expectedHeight }) => {
      const { container } = render(<Placeholder size={size} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ height: expectedHeight });
    });
  });

  it('works with different HTML tags and maintains functionality', () => {
    const tags = ['div', 'article', 'section', 'main'] as const;
    
    tags.forEach(tag => {
      const { container } = render(
        <Placeholder as={tag} className="test-class">
          Test content
        </Placeholder>
      );
      
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe(tag.toUpperCase());
      expect(element).toHaveClass('test-class');
      expect(element).toHaveClass('tsx-cmpnt-placeholder');
      expect(element).toHaveTextContent('Test content');
    });
  });

  it('prioritizes custom style over size when both provided', () => {
    const customStyle = { height: '999px', width: '888px' };
    const { container } = render(
      <Placeholder size="small" style={customStyle} />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle(customStyle);
    expect(element).not.toHaveStyle({ height: '300px' }); // small size height
  });

  it('handles undefined size gracefully', () => {
    const { container } = render(<Placeholder size={undefined} />);
    
    const element = container.firstChild as HTMLElement;
    // Should render without errors when size is undefined
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('tsx-cmpnt-placeholder');
  });
});
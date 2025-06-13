import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
  };

  it('renders image with src', () => {
    render(<Image {...defaultProps} />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders figure container with correct class', () => {
    render(<Image {...defaultProps} />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-image-container');
  });

  it('applies custom className to container', () => {
    render(<Image {...defaultProps} className="custom-image" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-image-container');
    expect(figure).toHaveClass('custom-image');
  });

  it('renders caption when provided', () => {
    render(<Image {...defaultProps} caption="Test image caption" />);
    
    expect(screen.getByText('Test image caption')).toBeInTheDocument();
    
    const figcaption = document.querySelector('figcaption');
    expect(figcaption).toBeInTheDocument();
    expect(figcaption).toHaveStyle({ fontSize: 'smaller' });
  });

  it('does not render caption when not provided', () => {
    render(<Image {...defaultProps} />);
    
    const figcaption = document.querySelector('figcaption');
    expect(figcaption).not.toBeInTheDocument();
  });

  it('uses caption as alt text when provided', () => {
    render(<Image {...defaultProps} caption="Beautiful sunset" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Beautiful sunset');
  });

  it('uses default alt text when no caption provided', () => {
    render(<Image {...defaultProps} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Image');
  });

  it('generates correct image id from src', () => {
    render(<Image src="https://example.com/my image.jpg" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('id', 'tsx-cmpnt-image-https%3A%2F%2Fexample.com%2Fmy%20image.jpg');
  });

  it('applies custom styles to container', () => {
    const customStyle = { border: '1px solid red', padding: '10px' };
    render(<Image {...defaultProps} style={customStyle} />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveStyle({
      border: '1px solid red',
      padding: '10px'
    });
  });

  it('passes imgProps to img element', () => {
    const imgProps = {
      loading: 'lazy' as const,
      width: 500,
      height: 300,
      'data-testid': 'test-image'
    };
    
    render(<Image {...defaultProps} imgProps={imgProps} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width', '500');
    expect(img).toHaveAttribute('height', '300');
    expect(img).toHaveAttribute('data-testid', 'test-image');
  });

  it('passes container props to figure element', () => {
    render(
      <Image 
        {...defaultProps} 
        data-testid="image-container"
        aria-label="Product image"
      />
    );
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-testid', 'image-container');
    expect(figure).toHaveAttribute('aria-label', 'Product image');
  });

  it('handles empty className gracefully', () => {
    render(<Image {...defaultProps} className="" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-image-container');
  });

  it('handles special characters in src for id generation', () => {
    render(<Image src="https://example.com/image with spaces & symbols!.png" />);
    
    const img = screen.getByRole('img');
    const expectedId = 'tsx-cmpnt-image-https%3A%2F%2Fexample.com%2Fimage%20with%20spaces%20%26%20symbols!.png';
    expect(img).toHaveAttribute('id', expectedId);
  });

  it('preserves imgProps alt if provided, overriding caption', () => {
    render(
      <Image 
        {...defaultProps} 
        caption="Caption text"
        imgProps={{ alt: 'Custom alt text' }}
      />
    );
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Custom alt text');
  });

  it('handles both style and imgProps together', () => {
    const containerStyle = { padding: '20px' };
    const imgProps = { style: { borderRadius: '8px' } };
    
    render(
      <Image 
        {...defaultProps} 
        style={containerStyle}
        imgProps={imgProps}
      />
    );
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveStyle({ padding: '20px' });
    
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ borderRadius: '8px' });
  });

  it('handles undefined imgProps gracefully', () => {
    render(<Image {...defaultProps} imgProps={undefined} />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    render(<Image src="test.jpg" />);
    
    const figure = screen.getByRole('figure');
    const img = screen.getByRole('img');
    
    expect(figure).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Image');
  });
});
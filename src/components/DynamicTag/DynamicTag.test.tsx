import { render, screen } from '@testing-library/react';
import { DynamicTag } from './DynamicTag';

describe('DynamicTag', () => {
  it('renders with default div tag', () => {
    const { container } = render(
      <DynamicTag>Test content</DynamicTag>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Test content');
  });

  it('renders with custom tag', () => {
    const { container } = render(
      <DynamicTag as="section">Test content</DynamicTag>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SECTION');
    expect(element).toHaveTextContent('Test content');
  });

  it('renders children content', () => {
    render(
      <DynamicTag as="span">
        <button>Click me</button>
        <p>Paragraph text</p>
      </DynamicTag>
    );
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('passes through additional attributes', () => {
    const { container } = render(
      <DynamicTag 
        as="article" 
        className="custom-class" 
        id="test-id"
        data-testid="dynamic-tag"
        aria-label="Custom article"
      >
        Content
      </DynamicTag>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('ARTICLE');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveAttribute('id', 'test-id');
    expect(element).toHaveAttribute('data-testid', 'dynamic-tag');
    expect(element).toHaveAttribute('aria-label', 'Custom article');
  });

  it('works with various HTML tags', () => {
    const tags = ['div', 'span', 'section', 'article', 'header', 'footer', 'main', 'aside'] as const;
    
    tags.forEach(tag => {
      const { container } = render(
        <DynamicTag as={tag}>Test content</DynamicTag>
      );
      
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe(tag.toUpperCase());
    });
  });

  it('handles style attributes', () => {
    const { container } = render(
      <DynamicTag 
        as="div" 
        style={{ backgroundColor: 'red', fontSize: '16px' }}
      >
        Styled content
      </DynamicTag>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      backgroundColor: 'red',
      fontSize: '16px'
    });
  });

  it('handles event handlers', () => {
    const handleClick = jest.fn();
    
    render(
      <DynamicTag as="button" onClick={handleClick}>
        Clickable
      </DynamicTag>
    );
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders complex children', () => {
    render(
      <DynamicTag as="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </DynamicTag>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { Content } from './Content';

// Mock DynamicTag to simplify testing
jest.mock('../DynamicTag/DynamicTag', () => ({
  DynamicTag: ({ children, as: Tag = 'div', style, ...props }: any) => (
    <Tag style={style} {...props}>
      {children}
    </Tag>
  ),
}));

describe('Content', () => {
  const defaultProps = {
    children: <div>Test content</div>,
  };

  it('renders children content', () => {
    render(<Content {...defaultProps} />);
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('uses default div tag when as prop not provided', () => {
    const { container } = render(<Content {...defaultProps} />);
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('DIV');
  });

  it('renders with custom HTML tag', () => {
    const { container } = render(
      <Content as="section" {...defaultProps} />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SECTION');
  });

  it('applies default styles', () => {
    const { container } = render(<Content {...defaultProps} />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    });
  });

  it('applies custom gap', () => {
    const { container } = render(
      <Content {...defaultProps} gap="2rem" />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      gap: '2rem'
    });
  });

  it('applies custom direction', () => {
    const { container } = render(
      <Content {...defaultProps} direction="row" />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      flexDirection: 'row'
    });
  });

  it('applies custom width', () => {
    const { container } = render(
      <Content {...defaultProps} width="50%" />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '50%'
    });
  });

  it('applies custom height', () => {
    const { container } = render(
      <Content {...defaultProps} height="300px" />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      height: '300px'
    });
  });

  it('passes additional attributes to DynamicTag', () => {
    const { container } = render(
      <Content 
        {...defaultProps} 
        id="test-content"
        className="custom-class"
        data-testid="content-element"
      />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('id', 'test-content');
    expect(element).toHaveAttribute('class', 'custom-class');
    expect(element).toHaveAttribute('data-testid', 'content-element');
  });

  it('renders multiple children', () => {
    render(
      <Content>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Content>
    );
    
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('renders complex children content', () => {
    render(
      <Content>
        <h1>Main Title</h1>
        <p>Description text</p>
        <button>Action Button</button>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </Content>
    );
    
    expect(screen.getByRole('heading', { level: 1, name: 'Main Title' })).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
  });

  it('renders with string children', () => {
    render(<Content>Simple text content</Content>);
    
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
  });

  it('renders with semantic HTML tags', () => {
    const { container: articleContainer } = render(
      <Content as="article">Article content</Content>
    );
    
    const { container: mainContainer } = render(
      <Content as="main">Main content</Content>
    );
    
    const { container: asideContainer } = render(
      <Content as="aside">Aside content</Content>
    );
    
    expect(articleContainer.firstChild?.nodeName).toBe('ARTICLE');
    expect(mainContainer.firstChild?.nodeName).toBe('MAIN');
    expect(asideContainer.firstChild?.nodeName).toBe('ASIDE');
  });

  it('combines all custom props correctly', () => {
    const { container } = render(
      <Content 
        as="section"
        gap="3rem"
        direction="row"
        width="80%"
        height="400px"
        className="combined-content"
        data-content="test"
      >
        <div>Combined content</div>
      </Content>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SECTION');
    expect(element).toHaveStyle({
      width: '80%',
      height: '400px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3rem'
    });
    expect(element).toHaveAttribute('class', 'combined-content');
    expect(element).toHaveAttribute('data-content', 'test');
  });

  it('handles null children gracefully', () => {
    const { container } = render(<Content>{null}</Content>);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element).toBeEmptyDOMElement();
  });

  it('handles undefined children gracefully', () => {
    const { container } = render(<Content>{undefined}</Content>);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element).toBeEmptyDOMElement();
  });

  it('applies event handlers correctly', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Content onClick={handleClick}>
        <div>Clickable content</div>
      </Content>
    );
    
    const element = container.firstChild as HTMLElement;
    element.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles zero dimensions correctly', () => {
    const { container } = render(
      <Content width="0" height="0">
        <div>Zero dimensions</div>
      </Content>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: '0',
      height: '0'
    });
  });

  it('handles CSS custom properties in dimensions', () => {
    const { container } = render(
      <Content 
        width="var(--content-width)" 
        height="var(--content-height)"
        gap="var(--content-gap)"
      >
        <div>Custom properties</div>
      </Content>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      width: 'var(--content-width)',
      height: 'var(--content-height)',
      gap: 'var(--content-gap)'
    });
  });

  it('maintains centering behavior with different directions', () => {
    const { container: columnContainer } = render(
      <Content direction="column">Column content</Content>
    );
    
    const { container: rowContainer } = render(
      <Content direction="row">Row content</Content>
    );
    
    const columnElement = columnContainer.firstChild as HTMLElement;
    const rowElement = rowContainer.firstChild as HTMLElement;
    
    expect(columnElement).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    });
    
    expect(rowElement).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    });
  });
});
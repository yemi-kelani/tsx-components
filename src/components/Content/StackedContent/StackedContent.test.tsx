import { render, screen } from '@testing-library/react';
import { StackedContent } from './StackedContent';

describe('StackedContent', () => {
  const defaultProps = {
    topContent: <div>Top content</div>,
    bottomContent: <div>Bottom content</div>,
  };

  it('renders top and bottom content', () => {
    render(<StackedContent {...defaultProps} />);
    
    expect(screen.getByText('Top content')).toBeInTheDocument();
    expect(screen.getByText('Bottom content')).toBeInTheDocument();
  });

  it('applies default container class', () => {
    const { container } = render(<StackedContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-stacked-content-container');
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <StackedContent {...defaultProps} className="custom-stacked" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-stacked-content-container');
    expect(containerDiv).toHaveClass('custom-stacked');
  });

  it('applies default top and bottom classes', () => {
    const { container } = render(<StackedContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    const topDiv = containerDiv.children[0] as HTMLElement;
    const bottomDiv = containerDiv.children[1] as HTMLElement;
    
    expect(topDiv).toHaveClass('tsx-cmpnt-stacked-content-top');
    expect(bottomDiv).toHaveClass('tsx-cmpnt-stacked-content-bottom');
  });

  it('applies custom className to top content', () => {
    const { container } = render(
      <StackedContent {...defaultProps} topClassName="custom-top" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const topDiv = containerDiv.children[0] as HTMLElement;
    
    expect(topDiv).toHaveClass('tsx-cmpnt-stacked-content-top');
    expect(topDiv).toHaveClass('custom-top');
  });

  it('applies custom className to bottom content', () => {
    const { container } = render(
      <StackedContent {...defaultProps} bottomClassName="custom-bottom" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const bottomDiv = containerDiv.children[1] as HTMLElement;
    
    expect(bottomDiv).toHaveClass('tsx-cmpnt-stacked-content-bottom');
    expect(bottomDiv).toHaveClass('custom-bottom');
  });

  it('applies default gap style', () => {
    const { container } = render(<StackedContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    });
  });

  it('applies custom gap as string', () => {
    const { container } = render(
      <StackedContent {...defaultProps} gap="2rem" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    });
  });

  it('applies custom gap as number', () => {
    const { container } = render(
      <StackedContent {...defaultProps} gap={24} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    });
  });

  it('renders complex ReactNode content', () => {
    const topContent = (
      <div>
        <h2>Top Title</h2>
        <p>Top description</p>
        <button>Top Action</button>
      </div>
    );
    
    const bottomContent = (
      <div>
        <h3>Bottom Title</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
    
    render(<StackedContent topContent={topContent} bottomContent={bottomContent} />);
    
    expect(screen.getByRole('heading', { level: 2, name: 'Top Title' })).toBeInTheDocument();
    expect(screen.getByText('Top description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Top Action' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Bottom Title' })).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles empty className gracefully', () => {
    const { container } = render(
      <StackedContent {...defaultProps} className="" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-stacked-content-container');
    expect(containerDiv.className).toBe('tsx-cmpnt-stacked-content-container ');
  });

  it('renders with string content', () => {
    render(
      <StackedContent 
        topContent="Simple top text" 
        bottomContent="Simple bottom text" 
      />
    );
    
    expect(screen.getByText('Simple top text')).toBeInTheDocument();
    expect(screen.getByText('Simple bottom text')).toBeInTheDocument();
  });

  it('renders with mixed content types', () => {
    const topContent = <img src="image.jpg" alt="Top image" />;
    const bottomContent = "Bottom text content";
    
    render(<StackedContent topContent={topContent} bottomContent={bottomContent} />);
    
    expect(screen.getByRole('img', { name: 'Top image' })).toBeInTheDocument();
    expect(screen.getByText('Bottom text content')).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = render(<StackedContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.children).toHaveLength(2);
    
    const topDiv = containerDiv.children[0] as HTMLElement;
    const bottomDiv = containerDiv.children[1] as HTMLElement;
    
    expect(topDiv.tagName).toBe('DIV');
    expect(bottomDiv.tagName).toBe('DIV');
    expect(topDiv).toHaveTextContent('Top content');
    expect(bottomDiv).toHaveTextContent('Bottom content');
  });

  it('renders null content gracefully', () => {
    render(<StackedContent topContent={null} bottomContent={null} />);
    
    const { container } = render(<StackedContent topContent={null} bottomContent={null} />);
    const containerDiv = container.firstChild as HTMLElement;
    
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.children).toHaveLength(2);
  });

  it('renders with undefined className props', () => {
    const { container } = render(
      <StackedContent 
        {...defaultProps} 
        className={undefined}
        topClassName={undefined}
        bottomClassName={undefined}
      />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const topDiv = containerDiv.children[0] as HTMLElement;
    const bottomDiv = containerDiv.children[1] as HTMLElement;
    
    expect(containerDiv).toHaveClass('tsx-cmpnt-stacked-content-container');
    expect(topDiv).toHaveClass('tsx-cmpnt-stacked-content-top');
    expect(bottomDiv).toHaveClass('tsx-cmpnt-stacked-content-bottom');
  });

  it('applies all custom classNames together', () => {
    const { container } = render(
      <StackedContent 
        {...defaultProps} 
        className="custom-container"
        topClassName="custom-top"
        bottomClassName="custom-bottom"
      />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const topDiv = containerDiv.children[0] as HTMLElement;
    const bottomDiv = containerDiv.children[1] as HTMLElement;
    
    expect(containerDiv).toHaveClass('tsx-cmpnt-stacked-content-container', 'custom-container');
    expect(topDiv).toHaveClass('tsx-cmpnt-stacked-content-top', 'custom-top');
    expect(bottomDiv).toHaveClass('tsx-cmpnt-stacked-content-bottom', 'custom-bottom');
  });

  it('handles zero gap correctly', () => {
    const { container } = render(
      <StackedContent {...defaultProps} gap={0} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    });
  });

  it('handles CSS custom properties as gap', () => {
    const { container } = render(
      <StackedContent {...defaultProps} gap="var(--spacing-large)" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-large)'
    });
  });
});
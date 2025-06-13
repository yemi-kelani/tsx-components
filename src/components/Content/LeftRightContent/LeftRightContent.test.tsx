import { render, screen } from '@testing-library/react';
import { LeftRightContent } from './LeftRightContent';

describe('LeftRightContent', () => {
  const defaultProps = {
    leftContent: <div>Left content</div>,
    rightContent: <div>Right content</div>,
  };

  it('renders left and right content', () => {
    render(<LeftRightContent {...defaultProps} />);
    
    expect(screen.getByText('Left content')).toBeInTheDocument();
    expect(screen.getByText('Right content')).toBeInTheDocument();
  });

  it('applies default container class', () => {
    const { container } = render(<LeftRightContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-left-right-content-container');
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} className="custom-layout" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-left-right-content-container');
    expect(containerDiv).toHaveClass('custom-layout');
  });

  it('applies default left and right classes when no shrink props', () => {
    const { container } = render(<LeftRightContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv).toHaveClass('tsx-cmpnt-left-right-content-left');
    expect(rightDiv).toHaveClass('tsx-cmpnt-left-right-content-right');
  });

  it('applies shrink left classes when shrinkLeft is true', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} shrinkLeft={true} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv).toHaveClass('tsx-cmpnt-left-right-content-shrink-left');
    expect(rightDiv).toHaveClass('tsx-cmpnt-left-right-content-expand-right');
  });

  it('applies shrink right classes when shrinkRight is true', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} shrinkRight={true} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv).toHaveClass('tsx-cmpnt-left-right-content-expand-left');
    expect(rightDiv).toHaveClass('tsx-cmpnt-left-right-content-shrink-right');
  });

  it('applies default classes when both shrinkLeft and shrinkRight are true', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} shrinkLeft={true} shrinkRight={true} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv).toHaveClass('tsx-cmpnt-left-right-content-left');
    expect(rightDiv).toHaveClass('tsx-cmpnt-left-right-content-right');
  });

  it('applies default classes when both shrinkLeft and shrinkRight are false', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} shrinkLeft={false} shrinkRight={false} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv).toHaveClass('tsx-cmpnt-left-right-content-left');
    expect(rightDiv).toHaveClass('tsx-cmpnt-left-right-content-right');
  });

  it('renders complex ReactNode content', () => {
    const leftContent = (
      <div>
        <h2>Left Title</h2>
        <p>Left description</p>
        <button>Left Action</button>
      </div>
    );
    
    const rightContent = (
      <div>
        <h3>Right Title</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
    
    render(<LeftRightContent leftContent={leftContent} rightContent={rightContent} />);
    
    expect(screen.getByRole('heading', { level: 2, name: 'Left Title' })).toBeInTheDocument();
    expect(screen.getByText('Left description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Left Action' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Right Title' })).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles empty className gracefully', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} className="" />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-left-right-content-container');
    expect(containerDiv.className).toBe('tsx-cmpnt-left-right-content-container ');
  });

  it('renders with string content', () => {
    render(
      <LeftRightContent 
        leftContent="Simple left text" 
        rightContent="Simple right text" 
      />
    );
    
    expect(screen.getByText('Simple left text')).toBeInTheDocument();
    expect(screen.getByText('Simple right text')).toBeInTheDocument();
  });

  it('renders with mixed content types', () => {
    const leftContent = <img src="image.jpg" alt="Left image" />;
    const rightContent = "Right text content";
    
    render(<LeftRightContent leftContent={leftContent} rightContent={rightContent} />);
    
    expect(screen.getByRole('img', { name: 'Left image' })).toBeInTheDocument();
    expect(screen.getByText('Right text content')).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = render(<LeftRightContent {...defaultProps} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.children).toHaveLength(2);
    
    const leftDiv = containerDiv.children[0] as HTMLElement;
    const rightDiv = containerDiv.children[1] as HTMLElement;
    
    expect(leftDiv.tagName).toBe('DIV');
    expect(rightDiv.tagName).toBe('DIV');
    expect(leftDiv).toHaveTextContent('Left content');
    expect(rightDiv).toHaveTextContent('Right content');
  });

  it('handles all shrink combinations correctly', () => {
    const testCases = [
      { 
        shrinkLeft: false, 
        shrinkRight: false, 
        expectedLeft: 'tsx-cmpnt-left-right-content-left',
        expectedRight: 'tsx-cmpnt-left-right-content-right'
      },
      { 
        shrinkLeft: true, 
        shrinkRight: false, 
        expectedLeft: 'tsx-cmpnt-left-right-content-shrink-left',
        expectedRight: 'tsx-cmpnt-left-right-content-expand-right'
      },
      { 
        shrinkLeft: false, 
        shrinkRight: true, 
        expectedLeft: 'tsx-cmpnt-left-right-content-expand-left',
        expectedRight: 'tsx-cmpnt-left-right-content-shrink-right'
      },
      { 
        shrinkLeft: true, 
        shrinkRight: true, 
        expectedLeft: 'tsx-cmpnt-left-right-content-left',
        expectedRight: 'tsx-cmpnt-left-right-content-right'
      },
    ];
    
    testCases.forEach(({ shrinkLeft, shrinkRight, expectedLeft, expectedRight }) => {
      const { container } = render(
        <LeftRightContent 
          {...defaultProps} 
          shrinkLeft={shrinkLeft} 
          shrinkRight={shrinkRight} 
        />
      );
      
      const containerDiv = container.firstChild as HTMLElement;
      const leftDiv = containerDiv.children[0] as HTMLElement;
      const rightDiv = containerDiv.children[1] as HTMLElement;
      
      expect(leftDiv).toHaveClass(expectedLeft);
      expect(rightDiv).toHaveClass(expectedRight);
    });
  });

  it('renders null content gracefully', () => {
    render(<LeftRightContent leftContent={null} rightContent={null} />);
    
    const { container } = render(<LeftRightContent leftContent={null} rightContent={null} />);
    const containerDiv = container.firstChild as HTMLElement;
    
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.children).toHaveLength(2);
  });

  it('renders with undefined className', () => {
    const { container } = render(
      <LeftRightContent {...defaultProps} className={undefined} />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('tsx-cmpnt-left-right-content-container');
  });
});
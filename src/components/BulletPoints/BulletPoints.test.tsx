import { render, screen } from '@testing-library/react';
import { BulletPoints, BulletPoint, ComplexBulletPoint } from './BulletPoints';

describe('BulletPoints', () => {
  it('renders simple string bullet points in ul', () => {
    const bulletList: BulletPoint[] = ['First item', 'Second item', 'Third item'];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
    expect(screen.getByText('Third item')).toBeInTheDocument();
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
    expect(list).toHaveStyle({ listStyleType: 'disc' });
  });

  it('renders simple string bullet points in ol', () => {
    const bulletList: BulletPoint[] = ['First item', 'Second item'];
    
    render(
      <BulletPoints 
        listType="ol" 
        listStyleType="decimal" 
        bulletList={bulletList} 
      />
    );
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(list).toHaveStyle({ listStyleType: 'decimal' });
  });

  it('renders HTML string content', () => {
    const bulletList: BulletPoint[] = [
      '<strong>Bold item</strong>',
      '<em>Italic item</em>'
    ];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="circle" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByRole('strong')).toHaveTextContent('Bold item');
    expect(screen.getByRole('emphasis')).toHaveTextContent('Italic item');
  });

  it('renders complex bullet points with nested lists', () => {
    const complexBulletPoint: ComplexBulletPoint = {
      text: 'Main item',
      listType: 'ol',
      listStyleType: 'decimal',
      subBulletList: ['Sub item 1', 'Sub item 2']
    };
    
    const bulletList: BulletPoint[] = [complexBulletPoint];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByText('Main item')).toBeInTheDocument();
    expect(screen.getByText('Sub item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub item 2')).toBeInTheDocument();
    
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2); // Main list + nested list
  });

  it('renders complex bullet points with HTML text', () => {
    const complexBulletPoint: ComplexBulletPoint = {
      text: '<span>HTML main item</span>',
      listType: 'ul',
      listStyleType: 'square',
      subBulletList: ['Sub item']
    };
    
    const bulletList: BulletPoint[] = [complexBulletPoint];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByText('HTML main item')).toBeInTheDocument();
    expect(screen.getByText('Sub item')).toBeInTheDocument();
  });

  it('handles mixed bullet point types', () => {
    const complexBulletPoint: ComplexBulletPoint = {
      text: 'Complex item',
      listType: 'ol',
      listStyleType: 'lower-alpha',
      subBulletList: ['Nested item']
    };
    
    const bulletList: BulletPoint[] = [
      'Simple string',
      '<em>HTML string</em>',
      complexBulletPoint
    ];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByText('Simple string')).toBeInTheDocument();
    expect(screen.getByText('HTML string')).toBeInTheDocument();
    expect(screen.getByText('Complex item')).toBeInTheDocument();
    expect(screen.getByText('Nested item')).toBeInTheDocument();
  });

  it('applies different list style types correctly', () => {
    const bulletList: BulletPoint[] = ['Item'];
    
    const { rerender } = render(
      <BulletPoints 
        listType="ul" 
        listStyleType="circle" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByRole('list')).toHaveStyle({ listStyleType: 'circle' });
    
    rerender(
      <BulletPoints 
        listType="ol" 
        listStyleType="upper-roman" 
        bulletList={bulletList} 
      />
    );
    
    expect(screen.getByRole('list')).toHaveStyle({ listStyleType: 'upper-roman' });
  });

  it('passes through additional attributes', () => {
    const bulletList: BulletPoint[] = ['Item'];
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={bulletList}
        data-testid="bullet-list"
        className="custom-list"
      />
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('data-testid', 'bullet-list');
    expect(list).toHaveClass('custom-list');
  });

  it('handles empty bullet list', () => {
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={[]} 
      />
    );
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });

  it('renders container with correct class', () => {
    const { container } = render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={['Item']} 
      />
    );
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('.tsx-cmpnt-bullet-points-container');
  });

  it('handles deeply nested complex bullet points', () => {
    const deeplyNested: ComplexBulletPoint = {
      text: 'Level 1',
      listType: 'ul',
      listStyleType: 'disc',
      subBulletList: [
        {
          text: 'Level 2',
          listType: 'ol',
          listStyleType: 'decimal',
          subBulletList: ['Level 3 item']
        }
      ]
    };
    
    render(
      <BulletPoints 
        listType="ul" 
        listStyleType="disc" 
        bulletList={[deeplyNested]} 
      />
    );
    
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
    expect(screen.getByText('Level 3 item')).toBeInTheDocument();
    
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(3); // Three levels of nesting
  });
});
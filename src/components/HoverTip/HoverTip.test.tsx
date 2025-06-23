import { render, screen } from '@testing-library/react';
import { HoverTip } from './HoverTip';

describe('HoverTip', () => {
  it('renders children content', () => {
    render(
      <HoverTip tip="Test tooltip">
        <button>Test Button</button>
      </HoverTip>,
    );

    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('renders tooltip text', () => {
    render(
      <HoverTip tip="Test tooltip">
        <span>Content</span>
      </HoverTip>,
    );

    expect(screen.getByText('Test tooltip')).toBeInTheDocument();
  });

  it('applies default tip position class', () => {
    const { container } = render(
      <HoverTip tip="Test tooltip">
        <span>Content</span>
      </HoverTip>,
    );

    const hoverTipElement = container.firstChild as HTMLElement;
    expect(hoverTipElement).toHaveClass('tsx-cmpnt-hovertip-position-top');
  });

  it('applies custom tip position class', () => {
    const { container } = render(
      <HoverTip tip="Test tooltip" tipPosition="bottom">
        <span>Content</span>
      </HoverTip>,
    );

    const hoverTipElement = container.firstChild as HTMLElement;
    expect(hoverTipElement).toHaveClass('tsx-cmpnt-hovertip-position-bottom');
  });

  it('applies custom className along with default classes', () => {
    const { container } = render(
      <HoverTip tip="Test tooltip" className="custom-class">
        <span>Content</span>
      </HoverTip>,
    );

    const hoverTipElement = container.firstChild as HTMLElement;
    expect(hoverTipElement).toHaveClass('tsx-cmpnt-hovertip');
    expect(hoverTipElement).toHaveClass('tsx-cmpnt-hovertip-position-top');
    expect(hoverTipElement).toHaveClass('custom-class');
  });

  it('passes through additional attributes', () => {
    const { container } = render(
      <HoverTip tip="Test tooltip" data-testid="hover-tip" aria-label="Hover tip">
        <span>Content</span>
      </HoverTip>,
    );

    const hoverTipElement = container.firstChild as HTMLElement;
    expect(hoverTipElement).toHaveAttribute('data-testid', 'hover-tip');
    expect(hoverTipElement).toHaveAttribute('aria-label', 'Hover tip');
  });

  it('renders with all tip positions', () => {
    const positions = ['top', 'right', 'bottom', 'left'] as const;

    positions.forEach((position) => {
      const { container } = render(
        <HoverTip tip="Test tooltip" tipPosition={position}>
          <span>Content</span>
        </HoverTip>,
      );

      const hoverTipElement = container.firstChild as HTMLElement;
      expect(hoverTipElement).toHaveClass(`tsx-cmpnt-hovertip-position-${position}`);
    });
  });

  it('renders tip text in correct span element', () => {
    render(
      <HoverTip tip="Test tooltip">
        <span>Content</span>
      </HoverTip>,
    );

    const tipElement = screen.getByText('Test tooltip');
    expect(tipElement).toHaveClass('tsx-cmpnt-hovertip-tip-text');
    expect(tipElement.tagName).toBe('SPAN');
  });
});

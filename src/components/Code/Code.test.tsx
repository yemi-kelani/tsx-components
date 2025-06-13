import { render, screen, fireEvent } from '@testing-library/react';
import { Code } from './Code';

// Mock the Gist component
jest.mock('./Gist', () => ({
  Gist: ({ id, file }: { id: string; file?: string }) => (
    <div data-testid="gist-component" data-gist-id={id} data-gist-file={file}>
      Mocked Gist Component
    </div>
  ),
}));

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }: { icon: any; className: string }) => (
    <span data-testid="font-awesome-icon" className={className}>
      {icon.iconName}
    </span>
  ),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('Code', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic code block with text', () => {
    render(
      <Code 
        type="basic" 
        text="console.log('hello');" 
        language="javascript" 
      />
    );
    
    expect(screen.getByRole('figure')).toBeInTheDocument();
    expect(screen.getByText("console.log('hello');")).toBeInTheDocument();
  });

  it('applies correct container classes', () => {
    render(<Code type="basic" text="test" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-code-container');
    expect(figure).toHaveClass('tsx-cmpnt-code-type-basic');
  });

  it('applies custom className', () => {
    render(<Code type="basic" text="test" className="custom-class" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-code-container');
    expect(figure).toHaveClass('tsx-cmpnt-code-type-basic');
    expect(figure).toHaveClass('custom-class');
  });

  it('renders gist type with Gist component', () => {
    render(<Code type="gist" gistID="123456" />);
    
    const gistComponent = screen.getByTestId('gist-component');
    expect(gistComponent).toBeInTheDocument();
    expect(gistComponent).toHaveAttribute('data-gist-id', '123456');
  });

  it('renders gist with specific file', () => {
    render(<Code type="gist" gistID="123456" gistFile="example.js" />);
    
    const gistComponent = screen.getByTestId('gist-component');
    expect(gistComponent).toHaveAttribute('data-gist-file', 'example.js');
  });

  it('shows copy button for basic type', () => {
    render(<Code type="basic" text="test code" />);
    
    const copyButton = screen.getByRole('button');
    expect(copyButton).toBeInTheDocument();
  });

  it('does not show copy button for gist type', () => {
    render(<Code type="gist" gistID="123456" />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('copies text to clipboard when copy button clicked', () => {
    const testCode = 'const x = 5;';
    render(<Code type="basic" text={testCode} />);
    
    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testCode);
  });

  it('applies theme classes to copy button and code elements', () => {
    render(<Code type="basic" text="test" theme="dark" />);
    
    const copyButton = screen.getByRole('button');
    expect(copyButton).toHaveClass('tsx-cmpnt-code-btn-theme-dark');
    
    const pre = document.querySelector('pre');
    expect(pre).toHaveClass('tsx-cmpnt-code-pre-theme-dark');
    
    const code = document.querySelector('code');
    expect(code).toHaveClass('tsx-cmpnt-code-code-theme-dark');
  });

  it('renders language label', () => {
    render(<Code type="basic" text="test" language="python" />);
    
    expect(screen.getByText('python')).toBeInTheDocument();
  });

  it('renders caption', () => {
    render(<Code type="basic" text="test" caption="Example code snippet" />);
    
    expect(screen.getByText('Example code snippet')).toBeInTheDocument();
  });

  it('adds line numbers when lineNumbers is true', () => {
    const multilineCode = 'line1\nline2\nline3';
    render(<Code type="basic" text={multilineCode} lineNumbers={true} />);
    
    const codeElement = screen.getByText(/1\. line1/);
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.textContent).toContain('1. line1');
    expect(codeElement.textContent).toContain('2. line2');
    expect(codeElement.textContent).toContain('3. line3');
  });

  it('does not add line numbers when lineNumbers is false', () => {
    const multilineCode = 'line1\nline2';
    render(<Code type="basic" text={multilineCode} lineNumbers={false} />);
    
    const codeElement = document.querySelector('code');
    expect(codeElement?.textContent).toBe(multilineCode);
    expect(codeElement?.textContent).not.toContain('1. line1');
  });

  it('handles empty text gracefully', () => {
    render(<Code type="basic" text="" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toBeInTheDocument();
  });

  it('handles undefined text gracefully', () => {
    render(<Code type="basic" />);
    
    const figure = screen.getByRole('figure');
    expect(figure).toBeInTheDocument();
  });

  it('applies language classes to pre and code elements', () => {
    render(<Code type="basic" text="test" language="typescript" />);
    
    const pre = document.querySelector('pre');
    expect(pre).toHaveClass('preblock-typescript');
    
    const code = document.querySelector('code');
    expect(code).toHaveClass('text-typescript');
  });

  it('passes through additional attributes', () => {
    render(
      <Code 
        type="basic" 
        text="test" 
        data-testid="code-component"
        aria-label="Code example"
      />
    );
    
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-testid', 'code-component');
    expect(figure).toHaveAttribute('aria-label', 'Code example');
  });

  it('renders both language and caption when provided', () => {
    render(
      <Code 
        type="basic" 
        text="test" 
        language="javascript" 
        caption="Hello world example" 
      />
    );
    
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('Hello world example')).toBeInTheDocument();
  });

  it('handles copy button with empty theme', () => {
    render(<Code type="basic" text="test" theme={undefined} />);
    
    const copyButton = screen.getByRole('button');
    expect(copyButton).toHaveClass('tsx-cmpnt-code-btn-theme-');
  });

  it('shows different icons for copy states', () => {
    render(<Code type="basic" text="test" />);
    
    // Should initially show clone icon
    expect(screen.getByText('clone')).toBeInTheDocument();
    
    // Click to trigger state change
    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);
    
    // Should show check icon after click
    expect(screen.getByText('check')).toBeInTheDocument();
  });

  it('applies correct theme classes to icons', () => {
    render(<Code type="basic" text="test" theme="light" />);
    
    const icons = screen.getAllByTestId('font-awesome-icon');
    icons.forEach(icon => {
      expect(icon).toHaveClass('tsx-cmpnt-code-btn-icon-light');
    });
  });
});
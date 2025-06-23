import { render, screen } from '@testing-library/react';
import { Video } from './Video';

describe('Video', () => {
  const defaultProps = {
    src: 'https://example.com/video.mp4',
  };

  it('renders video with src', () => {
    render(<Video {...defaultProps} />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();

    const source = video?.querySelector('source');
    expect(source).toHaveAttribute('src', 'https://example.com/video.mp4');
  });

  it('renders figure container with correct class', () => {
    render(<Video {...defaultProps} />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-video-container');
  });

  it('applies custom className to container', () => {
    render(<Video {...defaultProps} className="custom-video" />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-video-container');
    expect(figure).toHaveClass('custom-video');
  });

  it('uses default srcType when not provided', () => {
    render(<Video {...defaultProps} />);

    const video = document.querySelector('video');
    const source = video.querySelector('source');
    expect(source).toHaveAttribute('type', 'video/mp4');
  });

  it('uses custom srcType when provided', () => {
    render(<Video {...defaultProps} srcType="video/webm" />);

    const video = document.querySelector('video');
    const source = video.querySelector('source');
    expect(source).toHaveAttribute('type', 'video/webm');
  });

  it('renders caption when provided', () => {
    render(<Video {...defaultProps} caption="Test video caption" />);

    expect(screen.getByText('Test video caption')).toBeInTheDocument();

    const figcaption = document.querySelector('figcaption');
    expect(figcaption).toBeInTheDocument();
    expect(figcaption).toHaveStyle({ fontSize: 'smaller' });
  });

  it('does not render caption when not provided', () => {
    render(<Video {...defaultProps} />);

    const figcaption = document.querySelector('figcaption');
    expect(figcaption).not.toBeInTheDocument();
  });

  it('applies default video attributes', () => {
    render(<Video {...defaultProps} />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('width', '640');
    expect(video).toHaveAttribute('height', '480');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('playsinline');

    // Check for muted property on the element
    expect((video as HTMLVideoElement).muted).toBe(true);
  });

  it('generates correct video id from src', () => {
    render(<Video src="https://example.com/my video.mp4" />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute(
      'id',
      'tsx-cmpnt-video-https%3A%2F%2Fexample.com%2Fmy%20video.mp4',
    );
  });

  it('applies custom styles to container', () => {
    const customStyle = { border: '1px solid blue', padding: '20px' };
    render(<Video {...defaultProps} style={customStyle} />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveStyle({
      border: '1px solid blue',
      padding: '20px',
    });
  });

  it('passes videoProps to video element', () => {
    const videoProps = {
      loop: true,
      poster: 'poster.jpg',
      'data-testid': 'test-video',
    };

    render(<Video {...defaultProps} videoProps={videoProps} />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('poster', 'poster.jpg');
    expect(video).toHaveAttribute('data-testid', 'test-video');
  });

  it('passes container props to figure element', () => {
    render(<Video {...defaultProps} data-testid="video-container" aria-label="Product video" />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('data-testid', 'video-container');
    expect(figure).toHaveAttribute('aria-label', 'Product video');
  });

  it('videoProps override default attributes', () => {
    const videoProps = {
      width: 800,
      height: 600,
      autoPlay: false,
      muted: false,
      controls: false,
    };

    render(<Video {...defaultProps} videoProps={videoProps} />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('width', '800');
    expect(video).toHaveAttribute('height', '600');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).not.toHaveAttribute('controls');

    // Check for muted property on the element
    expect((video as HTMLVideoElement).muted).toBe(false);
  });

  it('handles empty className gracefully', () => {
    render(<Video {...defaultProps} className="" />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('tsx-cmpnt-video-container');
  });

  it('renders fallback text in video element', () => {
    render(<Video {...defaultProps} />);

    const video = document.querySelector('video');
    expect(video).toHaveTextContent('Your browser does not support the video tag.');
  });

  it('handles special characters in src for id generation', () => {
    render(<Video src="https://example.com/video with spaces & symbols!.mp4" />);

    const video = document.querySelector('video');
    const expectedId =
      'tsx-cmpnt-video-https%3A%2F%2Fexample.com%2Fvideo%20with%20spaces%20%26%20symbols!.mp4';
    expect(video).toHaveAttribute('id', expectedId);
  });

  it('renders with minimal props', () => {
    render(<Video src="test.mp4" />);

    const figure = screen.getByRole('figure');
    const video = document.querySelector('video');

    expect(figure).toBeInTheDocument();
    expect(video).toBeInTheDocument();

    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', 'test.mp4');
    expect(source).toHaveAttribute('type', 'video/mp4');
  });

  it('handles both style and videoProps together', () => {
    const containerStyle = { padding: '10px' };
    const videoProps = { style: { border: '1px solid red' } };

    render(<Video {...defaultProps} style={containerStyle} videoProps={videoProps} />);

    const figure = screen.getByRole('figure');
    expect(figure).toHaveStyle({ padding: '10px' });

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveStyle({ border: '1px solid red' });
  });

  it('handles undefined videoProps gracefully', () => {
    render(<Video {...defaultProps} videoProps={undefined} />);

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
  });
});

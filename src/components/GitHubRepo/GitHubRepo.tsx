import React from 'react';
import './GitHubRepo.css';

export type GitHubRepoProps = {
  owner: string;
  repo: string;
  link?: string;
  showDescription?: boolean;
  showLanguage?: boolean;
  showForks?: boolean;
  className?: string;
};

type GitHubRepoData = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
};

type FetchState = {
  data: GitHubRepoData | null;
  loading: boolean;
  error: string | null;
};

// Simple in-memory cache to avoid refetching
const repoCache: Record<string, GitHubRepoData> = {};

/**
 * Displays a GitHub repository card with metadata fetched from the GitHub API.
 * Shows repository name, owner, stars, and optionally description, language, and forks.
 * The entire card is clickable and navigates to the specified link or the repo homepage.
 *
 * @param props - The properties for the component.
 * @param props.owner - The GitHub username or organization that owns the repository.
 * @param props.repo - The repository name.
 * @param props.link - Optional custom URL to navigate to when clicked (defaults to repo homepage).
 * @param props.showDescription - Whether to display the repository description (default: true).
 * @param props.showLanguage - Whether to display the primary programming language (default: true).
 * @param props.showForks - Whether to display the fork count (default: false).
 * @param props.className - Additional CSS classes for the outer container.
 *
 * @returns A clickable card displaying GitHub repository information.
 */
export const GitHubRepo = ({
  owner,
  repo,
  link,
  showDescription = true,
  showLanguage = true,
  showForks = false,
  className,
}: GitHubRepoProps) => {
  const [state, setState] = React.useState<FetchState>({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    const cacheKey = `${owner}/${repo}`;

    // Check cache first
    if (repoCache[cacheKey]) {
      setState({ data: repoCache[cacheKey], loading: false, error: null });
      return;
    }

    const fetchRepoData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Repository not found');
          } else if (response.status === 403) {
            throw new Error('API rate limit exceeded');
          }
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: GitHubRepoData = await response.json();
        repoCache[cacheKey] = data; // Cache the result
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load repository',
        });
      }
    };

    fetchRepoData();
  }, [owner, repo]);

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const containerClass = className
    ? `tsx-cmpnt-github-repo ${className}`
    : 'tsx-cmpnt-github-repo';

  if (state.loading) {
    return (
      <div className={containerClass}>
        <div className="tsx-cmpnt-github-repo-loading">
          <div className="tsx-cmpnt-github-repo-skeleton-avatar" />
          <div className="tsx-cmpnt-github-repo-skeleton-content">
            <div className="tsx-cmpnt-github-repo-skeleton-title" />
            <div className="tsx-cmpnt-github-repo-skeleton-text" />
          </div>
        </div>
      </div>
    );
  }

  if (state.error || !state.data) {
    return (
      <div className={containerClass}>
        <div className="tsx-cmpnt-github-repo-error">
          <span className="tsx-cmpnt-github-repo-error-icon">⚠️</span>
          <span>{state.error || 'Failed to load repository'}</span>
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tsx-cmpnt-github-repo-error-link"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    );
  }

  const { data } = state;
  const targetUrl = link || data.html_url;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={containerClass}
    >
      <div className="tsx-cmpnt-github-repo-header">
        <img
          src={data.owner.avatar_url}
          alt={`${data.owner.login}'s avatar`}
          className="tsx-cmpnt-github-repo-avatar"
        />
        <div className="tsx-cmpnt-github-repo-info">
          <div className="tsx-cmpnt-github-repo-name">
            <span className="tsx-cmpnt-github-repo-owner">{data.owner.login}</span>
            <span className="tsx-cmpnt-github-repo-separator">/</span>
            <span className="tsx-cmpnt-github-repo-title">{data.name}</span>
          </div>
          <div className="tsx-cmpnt-github-repo-stats">
            <span className="tsx-cmpnt-github-repo-stat" title="Stars">
              <svg viewBox="0 0 16 16" width="16" height="16" className="tsx-cmpnt-github-repo-icon">
                <path
                  fillRule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                />
              </svg>
              {formatCount(data.stargazers_count)}
            </span>
            {showForks && (
              <span className="tsx-cmpnt-github-repo-stat" title="Forks">
                <svg viewBox="0 0 16 16" width="16" height="16" className="tsx-cmpnt-github-repo-icon">
                  <path
                    fillRule="evenodd"
                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  />
                </svg>
                {formatCount(data.forks_count)}
              </span>
            )}
            {showLanguage && data.language && (
              <span className="tsx-cmpnt-github-repo-stat tsx-cmpnt-github-repo-language">
                <span className={`tsx-cmpnt-github-repo-lang-dot tsx-cmpnt-github-repo-lang-${data.language.toLowerCase()}`} />
                {data.language}
              </span>
            )}
          </div>
        </div>
        <svg viewBox="0 0 16 16" width="24" height="24" className="tsx-cmpnt-github-repo-github-icon">
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </div>
      {showDescription && data.description && (
        <p className="tsx-cmpnt-github-repo-description">{data.description}</p>
      )}
    </a>
  );
};

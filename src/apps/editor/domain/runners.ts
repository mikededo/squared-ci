export type GitHubHostedRunners =
  | 'ubuntu-latest'
  | 'ubuntu-22.04'
  | 'ubuntu-20.04'
  | 'windows-latest'
  | 'windows-2022'
  | 'windows-2019'
  | 'macos-latest'
  | 'macos-13'
  | 'macos-12'
  | 'macos-11';

export const RunnersMap: Record<GitHubHostedRunners, string> = {
  'ubuntu-latest': 'Ubuntu Latest (LTS)',
  'ubuntu-22.04': 'Ubuntu 22.04',
  'ubuntu-20.04': 'Ubuntu 20.04',
  'windows-latest': 'Windows Latest (Server 2019)',
  'windows-2022': 'Windows Server 2022',
  'windows-2019': 'Windows Server 2019',
  'macos-latest': 'macOS Latest (Big Sur)',
  'macos-13': 'macOS Monterey (12)',
  'macos-12': 'macOS Big Sur (11)',
  'macos-11': 'macOS Catalina (10.15)',
};

export type DockerResponse = {
  page_size: number;
  next: string;
  previous: string;
  page: number;
  count: number;
  summaries: Summary[];
};

export type Summary = {
  id: string;
  name: string;
  slug: string;
  type: string;
  publisher: { id: string; name: string };
  created_at: string;
  updated_at: string;
  short_description: string;
  source: string;
  extension_reviewed: boolean;
  popularity: number;
  operating_systems: Array<{ name: string; label: string }>;
  architectures: Array<{ name: string; label: string }>;
  logo_url: { large: string; small: string };
  certification_status: string;
  star_count: number;
  pull_count: string;
  filter_type: string;
};

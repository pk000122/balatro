
export type MediaType = 'video' | 'game';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
  tags: string[];
  addedAt: number;
}

export interface EnrichmentResult {
  title: string;
  description: string;
  tags: string[];
}

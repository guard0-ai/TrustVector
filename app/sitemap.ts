import { MetadataRoute } from 'next';
import { getAllEntities } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trustvector.guard0.ai';
  const entities = getAllEntities();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic entity pages - Models
  const modelPages: MetadataRoute.Sitemap = entities
    .filter((e) => e.type === 'model')
    .map((entity) => ({
      url: `${baseUrl}/models/${entity.id}`,
      lastModified: new Date(entity.last_evaluated || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // Dynamic entity pages - Agents
  const agentPages: MetadataRoute.Sitemap = entities
    .filter((e) => e.type === 'agent')
    .map((entity) => ({
      url: `${baseUrl}/agents/${entity.id}`,
      lastModified: new Date(entity.last_evaluated || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // Dynamic entity pages - MCPs
  const mcpPages: MetadataRoute.Sitemap = entities
    .filter((e) => e.type === 'mcp')
    .map((entity) => ({
      url: `${baseUrl}/mcps/${entity.id}`,
      lastModified: new Date(entity.last_evaluated || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [...staticPages, ...modelPages, ...agentPages, ...mcpPages];
}

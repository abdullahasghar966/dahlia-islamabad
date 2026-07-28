import type { MetadataRoute } from "next";
import { plants } from "@/lib/content/plants";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] =
    [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
      { path: "/nursery", priority: 0.9, changeFrequency: "weekly" },
      { path: "/visit", priority: 0.9, changeFrequency: "monthly" },
      { path: "/story", priority: 0.6, changeFrequency: "monthly" },
      { path: "/aesthetic", priority: 0.6, changeFrequency: "weekly" },
      { path: "/legal/privacy", priority: 0.2, changeFrequency: "monthly" },
      { path: "/legal/cafe-policy", priority: 0.3, changeFrequency: "monthly" },
    ];

  return [
    ...routes.map((route) => ({
      url: new URL(route.path, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...plants.map((plant) => ({
      url: new URL(`/nursery/${plant.slug}`, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/teacher/", "/student/", "/api/"], // প্রাইভেট ড্যাশবোর্ড ব্লক থাকবে
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
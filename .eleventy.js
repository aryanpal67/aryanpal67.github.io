import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {

  // ── Plugins ──────────────────────────────────────────────
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // ── Pass-through copies ───────────────────────────────────
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("quizzes/**/*.json");

  // ── Collections ───────────────────────────────────────────
  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("stories/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("drawings", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("drawings/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ── Filters ───────────────────────────────────────────────
  eleventyConfig.addFilter("dateDisplay", function (date) {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // ── Watch targets ─────────────────────────────────────────
  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("assets/js/");

  // ── Build config ──────────────────────────────────────────
  return {
    pathPrefix: "/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

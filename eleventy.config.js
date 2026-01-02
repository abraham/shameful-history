import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('bundle.css');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('favicon.png');

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Output formats
    // formats: ['avif', 'webp', 'jpeg', 'svg'],
    // Output widths
    widths: [300, 600],
    // HTML attributes
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
    },
  });

  eleventyConfig.addFilter('readableDate', (dateObj, endDate) => {
    const options = {
      year: 'numeric',
      timeZone: 'UTC',
    };

    if (endDate) {
      const start = dateObj.toLocaleDateString('en-US', options);
      // Handle both Date objects and string dates
      const endObj = endDate instanceof Date ? endDate : new Date(endDate);
      const end = endObj.toLocaleDateString('en-US', options);
      return `${start} - ${end}`;
    }

    // Single day event - show full date
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });
}

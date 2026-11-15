import { readdirSync } from 'node:fs';
import { dirname, posix } from 'node:path';

const WIKIPEDIA = 'https://en.wikipedia.org/wiki/';

function isValidDate(value) {
  return value != null && !Number.isNaN(new Date(value).getTime());
}

function validateEvent(data) {
  const errors = [];
  const { title, date, endDate, sourceUrl, imageExtension } = data;

  if (!title) errors.push('`title` is required');
  if (![data.tags].flat().includes('event')) {
    errors.push('`tags` must include `event`');
  }
  if (!sourceUrl?.startsWith(WIKIPEDIA)) {
    errors.push(`\`sourceUrl\` must start with ${WIKIPEDIA}`);
  }
  if (!isValidDate(date)) errors.push('`date` must be a YYYY-MM-DD date');
  if (endDate != null) {
    if (!isValidDate(endDate)) {
      errors.push('`endDate` must be a YYYY-MM-DD date');
    } else if (isValidDate(date) && new Date(endDate) < new Date(date)) {
      errors.push('`endDate` must not be before `date`');
    }
  }

  const images = readdirSync(dirname(data.page.inputPath)).filter((file) =>
    file.startsWith('image.'),
  );
  if (imageExtension) {
    if (!images.includes(`image.${imageExtension}`)) {
      errors.push(`\`image.${imageExtension}\` is missing`);
    }
    if (!data.imageAttribution) {
      errors.push('`imageAttribution` is required with an image');
    }
    if (!data.imageDescription) {
      errors.push('`imageDescription` is required with an image');
    }
    if (!data.imageSourceUrl) {
      errors.push('`imageSourceUrl` is required with an image');
    }
  } else if (images.length > 0) {
    errors.push(`\`imageExtension\` is required for ${images.join(', ')}`);
  }

  if (errors.length > 0) throw new Error(errors.join('; '));
}

export default {
  // Events only render on the timeline, not as standalone pages
  permalink: false,
  eleventyComputed: {
    imagePath: (data) =>
      data.imageExtension
        ? posix.join(
            '/',
            dirname(data.page.inputPath),
            `image.${data.imageExtension}`,
          )
        : undefined,
  },
  eleventyDataSchema: validateEvent,
};

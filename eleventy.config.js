export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addFilter("readableDate", (dateObj, endDate) => {
        const options = {
            year: 'numeric',
            timeZone: 'UTC'
        };
        const start = dateObj.toLocaleDateString('en-US', options);
        if (endDate) {
            // Handle both Date objects and string dates
            const endObj = (endDate instanceof Date) ? endDate : new Date(endDate);
            const end = endObj.toLocaleDateString('en-US', options);
            return `${start} - ${end}`;
        }
        return start;
    });
};
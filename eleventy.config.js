import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("favicon.png");

    eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw") {
        if (alt === undefined) {
            // You bet we throw an error on missing alt (alt="" works okay)
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
        }

        let metadata = await Image(src, {
            widths: [300, 600, "auto"],
            formats: ["avif", "webp", "jpeg", "svg"],
            outputDir: "./_site/img/",
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        return Image.generateHTML(metadata, imageAttributes);
    });

    eleventyConfig.addFilter("readableDate", (dateObj, endDate) => {
        const options = {
            year: 'numeric',
            timeZone: 'UTC'
        };

        if (endDate) {
            const start = dateObj.toLocaleDateString('en-US', options);
            // Handle both Date objects and string dates
            const endObj = (endDate instanceof Date) ? endDate : new Date(endDate);
            const end = endObj.toLocaleDateString('en-US', options);
            return `${start} - ${end}`;
        }

        // Single day event - show full date
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });
    });
};
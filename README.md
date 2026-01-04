# shameful-history

Shameful History is a list of events where the US goverment acted shamefully or through inaction allowed something shameful to happen.

## Development

Clone the repository and install dependencies.

```sh
npm ci
```

Start the local server.

```sh
npm start
```

## Contributing

### Event requirements

- The event must be an instance where the US government acted shamefully or through inaction allowed something shameful to happen.
- The event must be supported by a Wikipedia article.

### Requesting an event

To request an event to be added, [open a new issue](https://github.com/abraham/shameful-history/issues/new).

### Adding an event

To add a new event:

1. Create a new directory in `events/` (e.g. `events/some-event/`).
2. Create an `index.md` file in that directory.
3. Add an `image.ext` image to that directory.
4. Add the following frontmatter to `index.md`:

   ```yaml
   ---
   title: Event Title
   date: YYYY-MM-DD
   endDate: YYYY-MM-DD
   tags: event
   sourceUrl: https://en.wikipedia.org/wiki/Event_Name
   imageExtension: ext
   imageAttribution: Attribution for the image
   imageDescription: Description of the image for accessibility
   imageSourceUrl: https://url/to/image/source
   ---
   ```

5. Add a description of the event as the content of the file.
6. Open a pull request.

### License

- Event text is CC BY-SA 4.0.
- Images are CC BY-SA 4.0 unless otherwise specified.
- The website is MIT licensed.

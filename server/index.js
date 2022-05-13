const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const asyncHandler = require('express-async-handler');
const port = 3010;

const build = path.join(__dirname, '..', 'build');

const html = /* HTML */ `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>My App</title>
        </head>
        <body>
            <script id="relay-records" type="application/json"></script>
            <div id="app"></div>
            <script type="module" src="browser.bundle.js"></script>
        </body>
    </html>`;

const renderComponent = require(path.join(build, 'ssr', 'ssr.bundle.js')).default;

app.get(
    '/',
    asyncHandler(async (req, res) => {
        const { markup: componentMarkup, relayRecords } = await renderComponent();
        const relayRecordsTag = `<script id="relay-records" type="application/json">${JSON.stringify(
            relayRecords,
        )}</script>`;

        const payload = html
            .replace('<div id="app"></div>', `<div id="app">${componentMarkup}</div>`)
            .replace('<script id="relay-records" type="application/json"></script>', relayRecordsTag);

        res.send(payload);
    }),
);

app.use(express.static(path.join(build, 'browser')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

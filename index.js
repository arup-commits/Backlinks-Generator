const express = require('express');
const app = express();

// Function to generate a backlink for a specific URL
function generateBacklink(targetUrl) {
    // Generate a random alphanumeric string for the backlink
    const randomString = Math.random().toString(36).substring(7);
    // Construct the full backlink URL using the target URL and random string
    const backlink = `${targetUrl}/${randomString}`;
    return backlink;
}

// Route to generate multiple backlinks for a specific URL
app.get('/generate-multiple-backlinks/:targetUrl/:count', (req, res) => {
    const targetUrl = req.params.targetUrl;
    let count = parseInt(req.params.count);

    // Limit count to a maximum of 5000
    count = Math.min(count, 5000);

    if (!targetUrl || isNaN(count) || count <= 0) {
        return res.status(400).send('Invalid parameters');
    }

    const backlinks = [];
    for (let i = 0; i < count; i++) {
        backlinks.push(generateBacklink(targetUrl));
    }

    res.json({ backlinks });
});

// Route to serve HTML user interface
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

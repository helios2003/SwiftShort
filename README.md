# SwiftShort
SwiftShort is a URL shortener. I made it primarily for learning basic system design and backend development. It is written in Node.js.

## Instructions to Set up the Repository

1. Clone the repository
2. Go the frontend directory and run `index.html` in your browser.
2. Go the backend directory and run `npm install`.
3. Change the name of ``.env.example`` to ``.env`` and fill the environment variables.
4. Run ``redis-server`` to start the redis server.
4. Run `npm start` to start the server.

## Using the Shortener

1. In ``index.html`` insert the URL you want to shorten in the input field.
3. Paste the shortened URL in your browser to be redirected to the original URL.

## System Design
![System Design](assets/system_design.png)
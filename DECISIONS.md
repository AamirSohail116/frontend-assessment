What trade-offs did you make and why?
Real-time updates: I focused on building the core features and Firebase login first. Real-time updates (like WebSocket or polling) were skipped due to limited time.

Stock API: Used a real API (Alpha Vantage).

State management: Picked Zustand because it's simple and fast. Redux Toolkit was more complex than needed for this project.

Server vs Client components: Used Server Components where possible to reduce JavaScript on the page. Client components were only used for interactive parts like the watchlist,authentication

What would you do with more time?
Add live stock price updates

Show charts with historical price data

Save the watchlist to Firebase for logged-in users

Add more tests

Include a Dockerfile for easier setup

How would you scale this for real users?
Add a backend to handle API requests and caching

Use WebSockets for real-time updates

Store watchlist and user data in a database like Firestore

Add tools for error tracking and monitoring (like Sentry)

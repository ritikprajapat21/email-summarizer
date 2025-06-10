# Mail Sage: AI-Powered Email Management
## Overview
Mail Sage is a web application designed to enhance email management and productivity by leveraging the Gemini API for AI-powered summarization and tagging. This helps users quickly understand email content and streamline their workflow. It also integrates Stripe for handling user subscriptions.

## Features
* AI-Powered Summarization and Tagging:

* * Uses the Gemini API to generate concise summaries of emails.

* * Automatically tags emails with relevant labels for better organization.

* User Subscription Management:

* * Implements Stripe for handling user subscriptions.

* Tech Stack:

* * Frontend: React, Next.js, Shadcn UI, Tailwind CSS

* * Backend: Next.js API routes

* * AI: Gemini API

* * Payment: Stripe

* User Authentication:

* * Implements Google OAuth for user authentication.

* Responsive UI:

* * Provides a user-friendly and responsive interface.

## Technologies Used
### * Frontend:

* * React

* * Next.js

* * Shadcn UI

* * Tailwind CSS

### * Backend:

* * Next.js API routes

* AI * Gemini API

* Payment:

* * Stripe

## Installation
Clone the repository.

Install the dependencies: bun install

Set up environment variables: * Create a .env file.

Add the following variables with your API keys and secrets:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
REDIRECT_URI=http://localhost:3000/auth/callback
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

Run the application: bun run dev

## Usage
* * Open the application in your browser.
* * Sign in with your Google account.
* * The application will summarize and tag your emails.

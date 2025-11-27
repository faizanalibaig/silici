# Silici — Human-Like Tweet Generator & Scheduler for X

Silici is a human-like tweet generator and scheduler for X (formerly Twitter). This repository contains a basic monorepo starter codebase.  
The complete production codebase is private, but this version serves as a solid foundation you can extend.

---

## Tech Stack
- Frontend: Next.js / React (located in `/apps/silife`)  
- Backend: Node.js / Express (located in `/apps/silibe`)  
- Package Manager: npm  
- Containerization: Docker + Docker Compose  
- AI Model: Google Gemini  
- Social API: X (Twitter) API

---

## Installation & Setup

#### Install Dependencies

```bash
npm install
npm run dev
```

#### Docker Setup
```bash
docker compose up
```

## Backend Requirements
To run the backend, you will need:

- Gemini API Key: Create an account on Google AI Studio and generate a Gemini API key.
- X (Twitter) API Key: Create a developer app on developer.x.com to obtain your X API credentials.

An example .env file is provided. Replace it with your own values.

## Demo
This repository includes a simple demo implementation of Silici.
You may extend it or build a complete version on top of it.


## Contributing
Contributions are welcome. Fork the repository, create a branch, and submit a pull request.

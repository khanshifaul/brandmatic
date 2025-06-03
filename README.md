# ChromaFlow

AI-powered brand color system generator that analyzes logos and creates harmonious color palettes with design tokens.

## Features

- Logo color analysis using Google's Gemini AI
- Automatic color palette generation
- Design token system generation
- Dark theme support
- Tailwind CSS integration
- Real-time preview
- Automatic CSS variable generation

## Prerequisites

- Node.js 18 or higher
- Google Gemini API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chromaflow.git
cd chromaflow
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

## Deployment on Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and create a new project

3. Import your repository

4. Add the following environment variable:
   - Name: `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY`
   - Value: Your Google Gemini API key

5. Deploy!

## Environment Variables

- `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY`: Required for logo analysis (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Tech Stack

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Google Gemini AI
- Style Dictionary

## License

MIT

## Author

[Your Name]

# Style Dictionary Complete Example

This starter project has everything you need to get started.

## How it works

All of the design tokens and assets are in this package. Make any changes to suit your needs. This package has iOS, Android, and web code.

To get started, run

```
$ npm install
$ npm run build
```

The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.

## iOS

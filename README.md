# Demo: Assistente Bancário Frontend

This project is the frontend application for the "Demo: Assistente Bancário", demonstrating guardrails and live monitoring in LLM-based chat agents.

## Overview

This demo illustrates how to implement safety mechanisms (guardrails) and evaluate agent responses in real time. The application provides:
- **Chat Agent**: A conversation interface with FinBot, an LLM-based banking assistant. Toggle guardrails on/off to filter user inputs for toxicity, financial advice, and hallucinations.
- **Live Monitoring**: A dashboard displaying service status, counts of filtered prompts by category, and manual evaluation of the agent's responses.
- **About**: Detailed information about policies, evaluation metrics, risk dimensions, risk levels, and recommendations.
And inactive features (in development):
- **Interactive Query Evaluation**: Real-time harm assessment with beautiful UI
- **Test Management**: Add, view, and manage test questions
- **Batch Testing**: Run comprehensive tests with detailed results


## Tech Stack

- **Next.js** 15 (App Router)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4
- **Radix UI** (Tabs)
- **Lucide React** for icons
- **ESLint** (Next.js core-web-vitals)
- **Docker** (optional)

## Project Structure

```bash
.
├── Dockerfile                  # Docker configuration (Node.js 18)
├── README.md                   # This documentation
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
├── postcss.config.mjs          # PostCSS / Tailwind CSS configuration
├── package.json                # Dependencies and scripts
├── public/                     # Static assets (logos, icons, etc.)
└── src/
    ├── app/                    # Application router files
    │   ├── globals.css         # Global styles
    │   ├── layout.tsx          # Root layout (fonts and metadata)
    │   └── page.tsx            # Home page
    └── components/             # React components
        ├── RAIDemoApp.tsx          # Main application component
        ├── ConversationalMode.tsx   # Chat agent interface
        ├── ControlPane.tsx         # Live monitoring dashboard
        ├── About.tsx               # About / documentation section
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Backend API running at `http://localhost:8000`

### Installation

```bash
git clone <repository-url>
cd rai-latam-demo-frontend
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - run ESLint

## Configuration

The frontend expects the backend API to be running at `http://localhost:8000`. The following endpoints are used:

- `POST /api/chat-guardrails` - Chat with guardrails enabled
- `POST /api/chat` - Chat without guardrails
- `GET /api/evaluation/status` - Check service health
- `POST /api/evaluate_response` - Evaluate agent's last response

## Docker (Optional)

Build and run using Docker:

```bash
docker build -t demo-assistente-bancario-frontend .
docker run -p 3000:3000 demo-assistente-bancario-frontend
```

## Contributing

Contributions are welcome! Please open issues for suggestions and submit pull requests for proposed changes.

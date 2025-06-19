# Harm Evaluator Frontend

A modern Next.js frontend application for the Harm Assessment Evaluator system.

## Features

- **Interactive Query Evaluation**: Real-time harm assessment with beautiful UI
- **Test Management**: Add, view, and manage test questions
- **Batch Testing**: Run comprehensive tests with detailed results
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icons

## Installation

1. **Navigate to the frontend directory:**
```bash
cd harm_evaluator_app/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   └── components/
│       ├── HarmEvaluatorApp.tsx    # Main app component
│       ├── InteractiveEvaluation.tsx # Query evaluation tab
│       ├── TestMode.tsx            # Test management tab
│       └── About.tsx               # About information tab
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Configuration

The frontend expects the backend API to be running on `http://localhost:8000`. Make sure the backend is running before starting the frontend.

## Components Overview

### HarmEvaluatorApp
Main application component that manages:
- Service status checking
- Tab navigation
- Layout and styling

### InteractiveEvaluation
Handles real-time query evaluation:
- Query input with keyboard shortcuts
- API communication with backend
- Results display with risk analysis
- Error handling

### TestMode
Manages test questions and batch testing:
- Load and display test questions
- Add new test questions
- Run batch tests
- Display test results with accuracy metrics

### About
Provides comprehensive information about:
- System overview and features
- Risk dimensions and levels
- Recommendations
- Technical architecture

## API Integration

The frontend communicates with the FastAPI backend through these endpoints:

- `GET /api/evaluation/status` - Check service health
- `POST /api/evaluation/query` - Evaluate a single query
- `GET /api/evaluation/questions` - Get all test questions
- `POST /api/evaluation/questions` - Add a new test question
- `POST /api/evaluation/batch-test` - Run batch test

## Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Custom gradients** for visual appeal
- **Responsive design** for all screen sizes
- **Accessible colors** following WCAG guidelines

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Follow the existing TypeScript patterns
3. Use Tailwind classes for styling
4. Ensure responsive design
5. Add proper error handling

### Code Style

- Use TypeScript for all new code
- Follow the existing component structure
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure accessibility

## Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Docker (Optional)
```bash
# Build Docker image
docker build -t harm-evaluator-frontend .

# Run container
docker run -p 3000:3000 harm-evaluator-frontend
```

## Troubleshooting

### Common Issues

1. **Backend not running**: Ensure the FastAPI backend is running on port 8000
2. **CORS errors**: Check that the backend has proper CORS configuration
3. **Build errors**: Run `npm run lint` and `npm run type-check` to identify issues
4. **Styling issues**: Clear browser cache and restart development server

### Performance Optimization

- Use `next/image` for optimized images
- Implement code splitting for large components
- Use React.memo for expensive components
- Minimize bundle size with proper imports

## Contributing

1. Follow the existing code style
2. Add TypeScript types for all new code
3. Test components thoroughly
4. Ensure responsive design
5. Add proper error handling

## License

This project is part of the Harm Assessment Evaluator system.

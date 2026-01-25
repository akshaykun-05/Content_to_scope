# Contributing to ContentScope

Thank you for your interest in contributing to ContentScope! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- AWS CLI (for deployment testing)
- OpenAI API key (for AI features)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/contentoscope.git`
3. Install dependencies: `npm install && cd frontend && npm install && cd ../backend && npm install && cd ../infrastructure && npm install && cd ..`
4. Copy environment: `cp .env.example .env`
5. Add your OpenAI API key to `.env`
6. Start development: `cd frontend && npm run dev`

## 🔄 Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commits:
- `feat: add new content analysis feature`
- `fix: resolve API timeout issue`
- `docs: update setup instructions`
- `refactor: improve AI service structure`

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes with tests
3. Ensure all tests pass: `npm test`
4. Update documentation if needed
5. Submit a pull request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Test results
   - Breaking changes (if any)

## 🧪 Testing

### Running Tests
```bash
# All tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests (if available)
cd frontend && npm test
```

### Test Requirements
- All new features must include tests
- Bug fixes should include regression tests
- Maintain or improve test coverage
- Tests must pass in CI/CD pipeline

## 📝 Code Style

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for functions
- Prefer functional programming patterns

### React Components
- Use functional components with hooks
- Follow component naming conventions
- Keep components small and focused
- Use TypeScript interfaces for props

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Test across different screen sizes

## 🏗️ Architecture Guidelines

### Frontend (React)
- Keep components in `frontend/src/components/`
- Pages go in `frontend/src/pages/`
- API calls in `frontend/src/services/`
- Use TypeScript interfaces for all data

### Backend (Lambda)
- Handlers in `backend/src/handlers/`
- Business logic in `backend/src/services/`
- Types in `backend/src/types/`
- Follow serverless best practices

### Infrastructure (CDK)
- Keep stack definitions modular
- Use environment variables for configuration
- Follow AWS best practices
- Document resource purposes

## 🐛 Bug Reports

When reporting bugs, include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Node.js version, browser
- **Screenshots**: If applicable
- **Error Messages**: Full error messages and stack traces

## 💡 Feature Requests

For new features, provide:
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Use Cases**: Who would use this feature?
- **Implementation Ideas**: Technical approach (optional)

## 📚 Documentation

### Required Documentation
- Update README.md for new features
- Add API documentation for new endpoints
- Include setup instructions for new dependencies
- Document configuration changes

### Documentation Style
- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep documentation up to date

## 🔒 Security

### Security Guidelines
- Never commit API keys or secrets
- Use environment variables for configuration
- Follow AWS security best practices
- Validate all user inputs
- Use HTTPS for all communications

### Reporting Security Issues
- Email security issues to: security@contentoscope.com
- Do not create public issues for security vulnerabilities
- Include detailed information about the vulnerability
- Allow time for fixes before public disclosure

## 🌟 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes for significant contributions
- Invited to join the core team for exceptional contributions

## 📞 Getting Help

- **Questions**: Use GitHub Discussions
- **Issues**: Create GitHub Issues
- **Chat**: Join our Discord (link in README)
- **Email**: contribute@contentoscope.com

## 📋 Checklist

Before submitting a PR, ensure:
- [ ] Code follows project style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No sensitive information is committed
- [ ] Branch is up to date with main
- [ ] PR description is clear and complete

## 🎯 Areas for Contribution

We especially welcome contributions in:
- **AI/ML**: Improving content analysis algorithms
- **UI/UX**: Enhancing user experience and design
- **Performance**: Optimizing load times and responsiveness
- **Testing**: Adding comprehensive test coverage
- **Documentation**: Improving guides and examples
- **Accessibility**: Making the app more accessible
- **Internationalization**: Adding multi-language support

Thank you for contributing to ContentScope! 🚀
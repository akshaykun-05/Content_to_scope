# ContentScope API Documentation

## Base URL

- **Development**: `http://localhost:3001/api/v1`
- **Production**: `https://your-api-gateway-url/api/v1`

## Authentication

Currently, the API doesn't require authentication. In a production environment, you would implement JWT tokens or API keys.

## Endpoints

### 1. Analyze Content

Analyzes content and provides AI-powered insights and recommendations.

**Endpoint**: `POST /analyze`

**Request Body**:
```json
{
  "content": "Your content text here...",
  "contentType": "text",
  "platforms": ["twitter", "linkedin", "instagram"],
  "userId": "optional-user-id"
}
```

**Parameters**:
- `content` (string, required): The content to analyze
- `contentType` (string, required): Type of content - "text", "image", or "url"
- `platforms` (array, required): Target platforms for analysis
- `userId` (string, optional): User identifier for tracking

**Response**:
```json
{
  "success": true,
  "data": {
    "analysisId": "analysis_1234567890_abc123",
    "overallScore": 72,
    "platformScores": [
      {
        "platform": "Twitter",
        "score": 78,
        "color": "#1DA1F2"
      }
    ],
    "engagementFactors": [
      {
        "name": "Headline",
        "score": 85,
        "status": "good",
        "explanation": "Strong hook that captures attention"
      }
    ],
    "failurePoints": [
      {
        "type": "critical",
        "title": "Content Too Long for Platform",
        "description": "Content exceeds optimal length",
        "suggestion": "Break into shorter segments",
        "impact": "High"
      }
    ],
    "improvements": [
      {
        "priority": "high",
        "title": "Shorten Content Length",
        "description": "Reduce content to platform-optimal length",
        "expectedImpact": "+25% engagement"
      }
    ],
    "adaptations": {
      "twitter": "Adapted content for Twitter...",
      "linkedin": "Adapted content for LinkedIn..."
    }
  },
  "message": "Content analysis completed successfully"
}
```

### 2. Adapt Content

Adapts existing content for a specific platform.

**Endpoint**: `POST /adapt`

**Request Body**:
```json
{
  "content": "Original content text...",
  "sourcePlatform": "blog",
  "targetPlatform": "twitter",
  "userId": "optional-user-id"
}
```

**Parameters**:
- `content` (string, required): Original content to adapt
- `sourcePlatform` (string, optional): Source platform format
- `targetPlatform` (string, required): Target platform for adaptation
- `userId` (string, optional): User identifier

**Response**:
```json
{
  "success": true,
  "data": {
    "originalContent": "Original content...",
    "adaptedContent": "Adapted content for Twitter...",
    "targetPlatform": "twitter"
  },
  "message": "Content adaptation completed successfully"
}
```

## Supported Platforms

- `twitter` - Twitter/X posts
- `linkedin` - LinkedIn posts
- `instagram` - Instagram captions
- `facebook` - Facebook posts
- `blog` - Blog posts/articles
- `youtube` - YouTube descriptions

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Common Error Codes**:
- `400` - Bad Request (missing required fields)
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Rate Limits

- **Free Tier**: 100 requests per hour per IP
- **Authenticated**: 1000 requests per hour per user

## Content Analysis Details

### Engagement Factors

The API analyzes these key factors:

1. **Headline** (0-100): Hook effectiveness and attention-grabbing potential
2. **Structure** (0-100): Content organization and readability
3. **Tone** (0-100): Appropriateness for target audience and platform
4. **Length** (0-100): Optimal length for platform and content type
5. **CTA** (0-100): Call-to-action clarity and effectiveness

### Failure Point Types

- **Critical**: Major issues that significantly impact performance
- **Warning**: Moderate issues that could improve performance
- **Info**: Minor suggestions for optimization

### Platform-Specific Optimizations

Each platform has specific requirements:

**Twitter**:
- 280 character limit
- 1-2 hashtags recommended
- Conversational tone
- Clear call-to-action

**LinkedIn**:
- Professional tone
- 1300 character sweet spot
- Industry-relevant hashtags
- Question to drive engagement

**Instagram**:
- Visual-first approach
- Story-driven captions
- 5-10 hashtags
- Emoji usage encouraged

## SDK Examples

### JavaScript/TypeScript

```typescript
const analyzeContent = async (content: string, platforms: string[]) => {
  const response = await fetch('/api/v1/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      contentType: 'text',
      platforms
    })
  });
  
  return response.json();
};

// Usage
const result = await analyzeContent(
  "Your content here...", 
  ["twitter", "linkedin"]
);
```

### Python

```python
import requests

def analyze_content(content, platforms):
    response = requests.post(
        'https://your-api-url/api/v1/analyze',
        json={
            'content': content,
            'contentType': 'text',
            'platforms': platforms
        }
    )
    return response.json()

# Usage
result = analyze_content(
    "Your content here...", 
    ["twitter", "linkedin"]
)
```

## Webhooks (Future Feature)

In future versions, the API will support webhooks for:
- Analysis completion notifications
- Performance tracking updates
- Learning progress milestones

## Changelog

### v1.0.0 (Current)
- Initial release
- Content analysis endpoint
- Platform adaptation endpoint
- Support for 6 major platforms
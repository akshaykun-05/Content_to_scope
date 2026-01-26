import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { verifyFirebaseToken } from '../services/authService'

const dynamoClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dynamoClient)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  }

  try {
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      }
    }

    // Verify authentication
    const authHeader = event.headers.Authorization || event.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
      }
    }

    const token = authHeader.substring(7)
    const decodedToken = await verifyFirebaseToken(token)
    const userId = decodedToken.uid

    // Get user stats
    const statsResponse = await docClient.send(new GetCommand({
      TableName: process.env.USER_STATS_TABLE_NAME,
      Key: { userId }
    }))

    // Get recent analyses for weekly progress
    const analysesResponse = await docClient.send(new QueryCommand({
      TableName: process.env.ANALYSIS_TABLE_NAME,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ScanIndexForward: false,
      Limit: 50
    }))

    const userStats = statsResponse.Item || {
      userId,
      totalAnalyses: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageScore: 0,
      modulesCompleted: [],
      achievements: [],
      lastActivityDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }

    // Calculate average score from total analyses
    if (userStats.totalAnalyses > 0 && userStats.totalScore) {
      userStats.averageScore = Math.round(userStats.totalScore / userStats.totalAnalyses)
    }

    // Generate weekly progress from recent analyses
    const weeklyProgress = generateWeeklyProgress(analysesResponse.Items || [])
    const monthlyProgress = generateMonthlyProgress(analysesResponse.Items || [])

    const response = {
      ...userStats,
      weeklyProgress,
      monthlyProgress,
      platformsUsed: extractPlatformsUsed(analysesResponse.Items || [])
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: response
      })
    }

  } catch (error) {
    console.error('Get user stats error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'STATS_FETCH_FAILED',
        message: error instanceof Error ? error.message : 'Failed to fetch user stats'
      })
    }
  }
}

function generateWeeklyProgress(analyses: any[]) {
  const last7Days = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayAnalyses = analyses.filter(analysis => 
      analysis.createdAt && analysis.createdAt.startsWith(dateStr)
    )
    
    const avgScore = dayAnalyses.length > 0 
      ? Math.round(dayAnalyses.reduce((sum, a) => sum + (a.overallScore || 0), 0) / dayAnalyses.length)
      : 0
    
    last7Days.push({
      date: dateStr,
      analyses: dayAnalyses.length,
      avgScore
    })
  }
  
  return last7Days
}

function generateMonthlyProgress(analyses: any[]) {
  const last4Weeks = []
  const today = new Date()
  
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - (i * 7) - 6)
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() - (i * 7))
    
    const weekAnalyses = analyses.filter(analysis => {
      if (!analysis.createdAt) return false
      const analysisDate = new Date(analysis.createdAt)
      return analysisDate >= weekStart && analysisDate <= weekEnd
    })
    
    const avgScore = weekAnalyses.length > 0 
      ? Math.round(weekAnalyses.reduce((sum, a) => sum + (a.overallScore || 0), 0) / weekAnalyses.length)
      : 0
    
    last4Weeks.push({
      week: `Week ${4 - i}`,
      analyses: weekAnalyses.length,
      avgScore
    })
  }
  
  return last4Weeks
}

function extractPlatformsUsed(analyses: any[]) {
  const platforms = new Set<string>()
  analyses.forEach(analysis => {
    if (analysis.platforms && Array.isArray(analysis.platforms)) {
      analysis.platforms.forEach((platform: string) => platforms.add(platform))
    }
  })
  return Array.from(platforms)
}
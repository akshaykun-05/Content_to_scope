import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { verifyFirebaseToken } from '../services/authService'

const dynamoClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dynamoClient)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
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

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'MISSING_BODY',
          message: 'Request body is required'
        })
      }
    }

    const updateData = JSON.parse(event.body)

    // Build update expression dynamically
    let updateExpression = 'SET updatedAt = :now'
    const expressionAttributeValues: any = {
      ':now': new Date().toISOString()
    }

    if (updateData.analysisScore !== undefined) {
      updateExpression += ', totalAnalyses = if_not_exists(totalAnalyses, :zero) + :one'
      updateExpression += ', totalScore = if_not_exists(totalScore, :zero) + :score'
      expressionAttributeValues[':zero'] = 0
      expressionAttributeValues[':one'] = 1
      expressionAttributeValues[':score'] = updateData.analysisScore
    }

    if (updateData.moduleCompleted !== undefined) {
      updateExpression += ', modulesCompleted = list_append(if_not_exists(modulesCompleted, :emptyList), :module)'
      expressionAttributeValues[':emptyList'] = []
      expressionAttributeValues[':module'] = [updateData.moduleCompleted]
    }

    if (updateData.achievementUnlocked !== undefined) {
      updateExpression += ', achievements = list_append(if_not_exists(achievements, :emptyList), :achievement)'
      expressionAttributeValues[':emptyList'] = []
      expressionAttributeValues[':achievement'] = [updateData.achievementUnlocked]
    }

    if (updateData.streakDays !== undefined) {
      updateExpression += ', currentStreak = :streak, longestStreak = if_not_exists(longestStreak, :zero)'
      expressionAttributeValues[':streak'] = updateData.streakDays
      
      // Update longest streak if current is higher
      if (updateData.streakDays > (updateData.longestStreak || 0)) {
        updateExpression += ', longestStreak = :streak'
      }
    }

    if (updateData.lastActivityDate !== undefined) {
      updateExpression += ', lastActivityDate = :date'
      expressionAttributeValues[':date'] = updateData.lastActivityDate
    }

    // Update user stats
    await docClient.send(new UpdateCommand({
      TableName: process.env.USER_STATS_TABLE_NAME,
      Key: { userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    }))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'User progress updated successfully'
      })
    }

  } catch (error) {
    console.error('Update user progress error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'UPDATE_FAILED',
        message: error instanceof Error ? error.message : 'Failed to update user progress'
      })
    }
  }
}
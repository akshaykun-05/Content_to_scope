#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ContentscopeStack } from '../lib/contentoscope-stack'

// Declare process for environment variables
declare const process: {
  env: {
    CDK_DEFAULT_ACCOUNT?: string
    CDK_DEFAULT_REGION?: string
  }
}

const app = new cdk.App()

new ContentscopeStack(app, 'ContentscopeStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'ContentScope - AI-powered content reasoning platform'
})
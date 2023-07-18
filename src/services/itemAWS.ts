import { Car } from "../interfaces/car.interfaces";
import ItemModel from '../models/items';
import * as AWS from 'aws-sdk'
import { DeleteItemOutput, DocumentClient, GetItemOutput, PutItemOutput, QueryOutput, ScanOutput, UpdateItemOutput } from 'aws-sdk/clients/dynamodb'

AWS.config.update({ region: 'us-east-2' })
const { DynamoDB } = AWS
const dynamoDB: DocumentClient = new DynamoDB.DocumentClient()

export function query (attributeName: string, attributeValue: string): Promise<QueryOutput> {
  const params = {
    ExpressionAttributeNames: {
      [`#${attributeName}`]: attributeName
    },
    ExpressionAttributeValues: {
      [`:${attributeName}`]: attributeValue
    },
    FilterExpression: `#${attributeName} = :${attributeName}`,
    //KeyConditionExpression: `#${attributeName} = :${attributeName}`,
    TableName: process.env.DYNAMODB_TABLE!
  }
  return dynamoDB.query(params).promise()
}

export function getItem (attributeName: string, attributeValue: string): Promise<GetItemOutput> {
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: { [attributeName]: attributeValue }
  }

  return dynamoDB.get(params).promise()
}

export function putItem (item: any): Promise<PutItemOutput> {
  console.log('table', process.env.DYNAMODB_TABLE)
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Item: item
  }
  return dynamoDB.put(params).promise()
}

export function updateItem (keyAttribute: string, keyValue: string,
                            attrsToUpdate: string[], attrValues: any[]): Promise<UpdateItemOutput> {

  const expressionAttributeNames = attrsToUpdate.map((attrToUpdate) => {
    return { [`#${attrToUpdate}`]: attrToUpdate }
  }).reduce((accum, item) => ({ ...accum, ...item }), {})

  const expressionAttributeValues = attrsToUpdate.map((attrToUpdate, index) => {
    return { [`:${attrToUpdate}`]: attrValues[index] }
  }).reduce((accum, item) => ({ ...accum, ...item }), {})
  console.log('attrNames', expressionAttributeNames)
  console.log('attrValues', expressionAttributeValues)

  const updateExpression = attrsToUpdate.map((attrToUpdate) => `#${attrToUpdate} = :${attrToUpdate}`).join(', ')
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: {
      [keyAttribute] : keyValue
    },
    UpdateExpression: 'set ' + updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  }
  return dynamoDB.update(params).promise()
}

export function deleteItem (attributeName: string, attributeValue: string): Promise<DeleteItemOutput> {

  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: {
      [attributeName] : attributeValue
    }
  }
  return dynamoDB.delete(params).promise()
}

export function scan (): Promise<ScanOutput> {
  const params = {
    TableName: process.env.DYNAMODB_TABLE!
  }

  return dynamoDB.scan(params).promise()
}

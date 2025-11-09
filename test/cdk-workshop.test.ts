import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';

test('Stack wires API Gateway through hit counter and downstream Lambda', () => {
  const app = new cdk.App();
  const stack = new CdkWorkshopStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);

  template.resourceCountIs('AWS::DynamoDB::Table', 1);
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    KeySchema: [
      {
        AttributeName: 'path',
        KeyType: 'HASH'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'path',
        AttributeType: 'S'
      }
    ]
  });

  template.hasResourceProperties(
    'AWS::Lambda::Function',
    Match.objectLike({
      Handler: 'hitcounter.handler',
      Environment: {
        Variables: {
          DOWNSTREAM_FUNCTION_NAME: Match.anyValue(),
          HITS_TABLE_NAME: Match.anyValue()
        }
      }
    })
  );

  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'hello.handler'
  });
});

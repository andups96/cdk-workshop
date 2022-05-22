import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    downstream: lambda.IFunction;
}
export declare class HitCounter extends Construct {
    /** allows accessing the counter function **/
    readonly handler: lambda.Function;
    constructor(scope: Construct, id: string, props: HitCounterProps);
}

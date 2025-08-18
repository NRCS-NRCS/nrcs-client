/* eslint-ignore */
import { AllDataQuery } from './generated/types/graphql';

declare module "./data/staticData.json" {
    const value: AllDataQuery;
    export default value;
}

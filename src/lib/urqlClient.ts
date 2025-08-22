import {
    cacheExchange,
    createClient,
    fetchExchange,
} from '@urql/core';

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN;
if (!graphqlUrl) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_DOMAIN is not defined in env variables');
}

// eslint-disable-next-line import/prefer-default-export
export const urqlClient = createClient({
    url: graphqlUrl, // Docker Desktop on Mac/Windows
    exchanges: [cacheExchange, fetchExchange],
});

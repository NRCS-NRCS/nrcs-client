import { gql } from 'urql';

export const STRATEGIC_DIRECTIVES = gql`
query StrategicDirectives {
    strategicDirectives {
        totalCount
        results {
            contactPersonEmail
            contactPersonName
            description
            id
            slug
            title
        }
    }
    majorResponsibilities {
        totalCount
        results {
            description
            id
            slug
            title
            directive {
                id
                title
            }
        }
    }
}
`;

export const GET_SLUGS = gql`
query GetSlugs {
    strategicDirectives {
        results {
            id
            slug
            title
        }
    }
}
`;

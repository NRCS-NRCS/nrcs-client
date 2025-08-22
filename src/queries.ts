import { gql } from 'urql';

export const STRATEGIC_DIRECTIVES = gql`
    query StrategicDirectives {
        strategicDirectives {
            contactPersonEmail
            contactPersonName
            description
            id
            slug
            title
            majorResponsibilities {
                description
                id
                slug
                title
            }
            coverImage {
                name
                url
            }
        }
        departments {
            contactPersonEmail
            contactPersonName
            description
            id
            slug
            strategicDirective {
                id
            }
            title
        }
        works {
            startDate
            id
            endDate
            description
            title
            strategicDirective {
                id
            }
            coverImage {
                name
                url
            }
        }
    }
`;

export const GET_STRATEGIC_DIRECTIVES_SLUGS = gql`
    query GetStrategicDirectivesSlugs {
        strategicDirectives {
            id
            slug
            title
        }
    }
`;

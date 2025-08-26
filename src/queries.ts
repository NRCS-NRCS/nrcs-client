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

export const GET_WORKS = gql`
    query GetWorks {
        works {
            title
            startDate
            id
            endDate
            description
            coverImage {
                url
            }
            strategicDirective {
                id
                slug
                title
            }
        }
    }
`;

export const VACANCIES = gql`
    query Vacancies {
        jobVacancies {
            id
            title
            expiryDate
            position
        }
    }
`;

export const GET_WORK_DETAILS = gql`
    query GetWorkDetails($workId: ID!) {
        work(id: $workId) {
            id
            title
            startDate
            endDate
            description
            coverImage {
                url
            }
            strategicDirective {
                id
                title
            }
        }
    }
`;

export const VACANCY = gql`
    query Vacancy($id: ID!) {
        jobVacancy(id: $id) {
            description
            expiryDate
            file {
                name
                size
                url
            }
            id
            numberOfVacancies
            position
            title
        }
    }
`;

export const PROCUREMENTS = gql`
    query Procurements {
        procurements {
            id
            publishedDate
            title
            expiryDate
            description
        }
    }
`;

export const PROCUREMENT = gql`
    query Procurement($id: ID!) {
        procurement(id: $id) {
            id
            title
            publishedDate
            file {
                url
                size
                name
            }
            expiryDate
            description
        }
    }
`;

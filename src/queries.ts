import { gql } from 'urql';

export const WORKS = gql`
    query Works {
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
        news {
            content
            id
            publishedDate
            slug
            title
            coverImage {
                name
                size
                url
            }
            file {
                name
                size
                url
            }
        }
    }
`;

export const GET_WORK_SLUGS = gql`
    query GetWorkSlugs {
        strategicDirectives {
            id
            slug
            title
        }
    }
`;

export const NEWS_FOR_WORK = gql`
    query NewsForWork($workId: ID!){
        news(filters: {directive: $workId}) {
            content
            id
            publishedDate
            slug
            title
            coverImage {
                name
                size
                url
            }
            file {
                name
                size
                url
            }
        }
    }
`;

export const RESOURCES_FOR_WORK = gql`
    query ResourcesForWork($workId: ID!) {
        resources(filters: {directive: $workId}) {
            coverImage {
                name
                size
                url
            }
            id
            publishedDate
            slug
            title
            content
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

export const FAQS = gql`
    query Faqs {
        faqs {
            id
            answer
            orderIndex
            question
        }
    }
`;

export const GET_BLOGS = gql`
    query GetBlogs {
        blogs {
            id
            featured
            content
            author
            publishedDate
            slug
            status
            title
            coverImage {
                name
                url
            }
        }
    }
`;

export const GET_BLOG_DETAILS = gql`
    query GetBlogDetails($blogId: ID!) {
        blog(id: $blogId) {
            id
            featured
            content
            author
            publishedDate
            slug
            status
            title
            coverImage {
                name
                url
            }
        }
    }
`;

export const GET_RESOURCES = gql`
    query GetResources {
        resources {
            id
            content
            publishedDate
            title
            file {
                url
                name
                size
            }
        }
    }
`;

export const GET_RESOURCE_DETAILS = gql`
    query GetResourceDetails($resourceId: ID!) {
        resource(id: $resourceId) {
            id
            content
            publishedDate
            title
            file {
                url
                name
                size
            }
        }
    }
`;

export const NEWS_LIST = gql`
    query NewsList {
        news {
            content
            id
            publishedDate
            slug
            title
            coverImage {
                name
                size
                url
            }
            directive {
                pk
            }
            file {
                name
                size
                url
            }
        }
    }
`;

export const NEWS_ITEM = gql`
    query NewsItem($newsId: ID!) {
        newsItem(id: $newsId) {
            content
            coverImage {
                name
                size
                url
            }
            directive {
                pk
            }
            file {
                name
                size
                url
            }
            id
            publishedDate
            slug
            title
        }
    }
`;

export const HOME_PAGE_DETAILS = gql`
    query HomePage {
        highlights {
            description
            expiryDate
            heading
            id
            image {
                name
                size
                url
            }
            actionLinks {
                label
                url
            }
        }
        news(order: { publishedDate: ASC }) {
            content
            id
            publishedDate
            slug
            title
            coverImage {
                name
                size
                url
            }
        }
        blogs {
            author
            content
            id
            featured
            publishedDate
            slug
            status
            title
            coverImage {
                name
                size
                url
            }
        }
        resources {
            id
            content
            publishedDate
            title
            coverImage {
                url
                name
                size
            }
        }
    }
`;

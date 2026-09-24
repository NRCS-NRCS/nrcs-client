import fs from 'fs';
import { gql, GraphQLClient } from 'graphql-request';
import path from 'path';

const datadir = path.join(__dirname, '../data');
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN;
const pipelineType = process.env.PIPELINE_TYPE;

if (pipelineType !== 'ci' && !GRAPHQL_ENDPOINT) {
    throw new Error(
        'NEXT_PUBLIC_GRAPHQL_DOMAIN is not set. Define it in .env or the environment before running the build.',
    );
}

const client = new GraphQLClient(GRAPHQL_ENDPOINT ?? '');

const PAGE_SIZE = 1000;

const dummyData = {
    strategicDirectives: { results: [] },
    departments: { results: [] },
    news: { results: [] },
    jobVacancies: { results: [] },
    highlights: { results: [] },
    blogs: { results: [] },
    majorResponsibilities: { results: [] },
    partners: { results: [] },
    procurements: { results: [] },
    resources: { results: [] },
    projects: { results: [] },
    faqs: { results: [] },
    radioProgram: { results: [] },
    cecMembers: { results: [] },
};

const strategicDirectivesQuery = gql`
    query StrategicDirective($pagination: OffsetPaginationInput) {
        strategicDirectives(pagination: $pagination) {
            results {
                title
                slug
                id
                description
                coverImage {
                    name
                    url
                }
                majorResponsibilities {
                    description
                    slug
                    title
                    id
                }
            }
            totalCount    
        }
    }
`;

const departmentsQuery = gql`
    query Departments($pagination: OffsetPaginationInput) {
        departments(pagination: $pagination) {
            results {
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
            totalCount                
        }
    }
`;

const newsQuery = gql`
    query News($pagination: OffsetPaginationInput) {
        news(
            pagination: $pagination
            filters: { status: PUBLISHED }
            order: { publishedDate: DESC }
        ) {
            results {
                content
                id
                publishedDate
                slug
                title
                attachments {
                    id
                    order
                    label
                    file {
                        name
                        url
                        size
                    }
                }
                keyStats {
                    id
                    order
                    title
                    stat
                    featured
                }
                coverImage {
                    url
                    name
                }
                actionLinks {
                    label
                    url
                }
                isHighlighted
                showInPopup
            }
            totalCount    
        }
    }
`;


const jobVacanciesQuery = gql`
    query JobVacancies($pagination: OffsetPaginationInput) {
        jobVacancies(pagination: $pagination) {
            results {
                isArchived
                id
                expiryDate
                description
                file {
                    url
                    size
                    name
                }
                numberOfVacancies
                position
                title
                publishedAt
            }
            totalCount
        }
    }
`;


const blogsQuery = gql`
    query Blogs($pagination: OffsetPaginationInput) {
        blogs(pagination: $pagination) {
            results {
                title
                status
                slug
                publishedDate
                id
                featured
                content
                author
                coverImage {
                    name
                    size
                    url
                }
            }
            totalCount
        }
    }
`;

const majorResponsibilitiesQuery = gql`
    query MajorResponsibilities($pagination: OffsetPaginationInput) {
        majorResponsibilities(pagination: $pagination) {
            results {
                title
                slug
                id
                description
            }
            totalCount
        }
    }
`;


const partnersQuery = gql`
    query Partners($pagination: OffsetPaginationInput) {
        partners(pagination: $pagination) {
            results {
                id
                title
                scope
                image {
                    name
                    url
                    size
                }
            }
            totalCount
        }
    }
`;

const procurementsQuery = gql`
    query Procurements($pagination: OffsetPaginationInput) {
        procurements(pagination: $pagination) {
            results {
                title
                publishedDate
                id
                file {
                    url
                    size
                    name
                }
                expiryDate
                description
            }
            totalCount
        }
    }
`;

const resourcesQuery = gql`
    query Resources($pagination: OffsetPaginationInput) {
        resources(pagination: $pagination, filters: {}) {
            results {
                content
                coverImage {
                    url
                    size
                    name
                }
                id
                publishedDate
                slug
                title
                type
                file {
                    name
                    size
                    url
                }
                directiveId
            }
            totalCount
        }
    }
`;

const projectsQuery = gql`
    query Projects($pagination: OffsetPaginationInput) {
        projects(pagination: $pagination) {
            results {
                title
                id
                description
                department {
                    id
                    strategicDirective {
                        id
                    }
                }
                coverImage {
                    url
                    size
                    name
                }
            }
            totalCount
        }
    }
`;

const faqsQuery = gql`
    query Faqs($pagination: OffsetPaginationInput) {
        faqs(pagination: $pagination) {
            results {
                answer
                id
                orderIndex
                question
            }
            totalCount
        }
    }
`;

const radioProgramQuery = gql`
    query RadioProgram($pagination: OffsetPaginationInput) {
        radioProgram(pagination: $pagination) {
            results {
                type
                title
                publishedDate
                id
                audioFile {
                    name
                    size
                    url
                }
            }
            totalCount
        }
    }
`;

const cecMembersQuery = gql`
    query CecMembers($pagination: OffsetPaginationInput) {
        cecMembers(
            pagination: $pagination
            filters: { isActive: { exact: true } }
            order: { orderIndex: ASC }
        ) {
            results {
                id
                name
                memberType
                designation
                email
                secondaryEmail
                address
                contactNumber
                photo {
                    name
                    url
                }
            }
            totalCount
        }
    }
`;

async function fetchAllPages(
    query: string,
    key: string,
) {
    let offset = 0;
    let allResults: any[] = [];
    let totalCount = 0;

    while (true) {
        const variables = {
            pagination: {
                limit: PAGE_SIZE,
                offset,
            },
        };

        const response = await client.request(query, variables);

        const responseData =
            (response as Record<string, any>)?.[key];

        const results = responseData?.results ?? [];
        totalCount = responseData?.totalCount ?? 0;

        allResults = [...allResults, ...results];

        console.log(
            `${key}: fetched ${results.length} items (offset ${offset}, total ${totalCount})`,
        );

        offset += PAGE_SIZE;

        if (offset >= totalCount) {
            break;
        }
    }

    return { results: allResults };
}


async function fetchAndWriteData() {
    console.log('Fetching data from GraphQL endpoint from ', GRAPHQL_ENDPOINT);

    const data: Record<string, any> = { ...dummyData };

    if (pipelineType !== 'ci') {
        // Define the queries mapping
        const queriesMap: Record<string, string> = {
            strategicDirectives: strategicDirectivesQuery,
            departments: departmentsQuery,
            news: newsQuery,
            jobVacancies: jobVacanciesQuery,
            blogs: blogsQuery,
            majorResponsibilities: majorResponsibilitiesQuery,
            partners: partnersQuery,
            procurements: procurementsQuery,
            resources: resourcesQuery,
            projects: projectsQuery,
            faqs: faqsQuery,
            radioProgram: radioProgramQuery,
            cecMembers: cecMembersQuery,
        };
        // fetch each query in parallel
        const promises = Object.entries(queriesMap).map(async ([key, query]) => {
            const results = await fetchAllPages(query, key);
            return [key, results] as const;
        });

        // Wait for all to finish
        const entries = await Promise.all(promises);

        // Merge results into data
        for (const [key, results] of entries) {
            data[key] = results;
        }
    }

    // ensure the `data` directory exists
    if (!fs.existsSync(datadir)) {
        fs.mkdirSync(datadir, { recursive: true });
    }
    const outputPath = path.join(__dirname, '../data/staticData.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`Data written to ${outputPath}`);
}

fetchAndWriteData();

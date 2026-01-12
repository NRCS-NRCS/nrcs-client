import fs from 'fs';
import { gql, GraphQLClient } from 'graphql-request';
import path from 'path';

const datadir = path.join(__dirname, '../data');
const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN || 'http://localhost:8000/graphql/';
const pipelineType = process.env.PIPELINE_TYPE;

const client = new GraphQLClient(GRAPHQL_ENDPOINT);
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
};

const query = gql`
    query AllQuery {
        strategicDirectives(pagination: { limit: 1000 }) {
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
        }

        departments(pagination: { limit: 1000 }) {
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
        }

        news(filters: { status: PUBLISHED }, pagination: { limit: 1000 }) {
            results {
                content
                id
                publishedDate
                slug
                title
                file {
                    name
                    url
                    size
                }
                coverImage {
                    url
                    name
                }
            }
        }

        jobVacancies(pagination: { limit: 1000 }) {
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
        }

        highlights(pagination: { limit: 1000 }) {
            results {
                description
                isActive
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
        }

        blogs(filters: { status: PUBLISHED }, pagination: { limit: 1000 }) {
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
        }

        majorResponsibilities(pagination: { limit: 1000 }) {
            results {
                title
                slug
                id
                description
            }
        }

        partners(pagination: { limit: 1000 }) {
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
        }

        procurements(pagination: { limit: 1000 }) {
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
        }

        resources(filters: {}, pagination: { limit: 1000 }) {
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
        }

        projects(pagination: { limit: 1000 }) {
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
        }

        faqs(pagination: { limit: 1000 }) {
            results {
                answer
                id
                orderIndex
                question
            }
        }

        radioProgram(pagination: { limit: 1000 }) {
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
        }
    }
`;

async function fetchAndWriteData() {
    console.log('Fetching data from GraphQL endpoint from ', GRAPHQL_ENDPOINT);

    let data = {};
    if (pipelineType === 'ci') {
        data = dummyData;
    } else if (pipelineType === 'cd') {
        data = await client.request(query);
    } else {
        // fallback to local dev behavior
        data = await client.request(query);
    }

    // ensure the `data` directory exists
    if (!fs.existsSync(datadir)) {
        fs.mkdirSync(datadir, { recursive: true });
    }
    const outputPath = path.join(__dirname, '../data/staticData.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Data written to ${outputPath}`);
    console.log(`Top-level keys: ${Object.keys(data ?? {}).join(', ')}`);
}

fetchAndWriteData();

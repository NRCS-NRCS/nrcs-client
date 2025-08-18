import { GraphQLClient, gql } from 'graphql-request';
import fs from 'fs';
import path from 'path';

const datadir = path.join(__dirname, '../data');
const GRAPHQL_ENDPOINT = process.env.APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql/';
const pipelineType = process.env.PIPELINE_TYPE;

const client = new GraphQLClient(GRAPHQL_ENDPOINT);

const dummyData = {
    events: {
        results: [],
    },
    blogs: {
        results: [],
    },
    galleries:{
        results: [],
    },
    galleryItems:{
        results: [],
    },
    artWorks:{
        results: [],
    },
    teamMembers: {
        results: [],
    },
    jobVacancies: {
        results: [],
    },
    positions: {
        results: [],
    },
    youtubeVideos: {
        results: [],
    },
    voxpopEpisodes: {
        results: [],
    },
    podcastEpisodes: {
        results: [],
    },
    reports:{
        results: [],
    },
};

const query = gql`
    query AllData {
        events {
            results {
                id
                name
                description
                location
                startDate
                endDate
                thumbnail {
                    url
                    name
                }
            }
        }

        blogs {
            results {
                id
                title
                publishedDate
                featured
                content
                author {
                    id
                    name
                    image {
                        url
                        name
                    }
                }
                coverImage {
                    url
                    name
                }
            }
        }

        galleries {
            results {
                description
                id
                isArchived
                name
            }
        }

        galleryItems {
            results {
                caption
                id
                image {
                    name
                    url
                }
                gallery {
                    id
                    name
                    description
                }
                isArchived
            }
        }

        artWorks {
            results {
                id
                image {
                    url
                    name
                }
                name
            }
        }

        teamMembers {
            results {
                id
                firstName
                middleName
                lastName
                designation
                memberType
                bio
                instagramLink
                linkedinLink
                memberPhoto {
                    url
                    name
                }
            }
        }

        jobVacancies {
            results {
                id
                numberOfVacancies
                deadline
                description
                position {
                    id
                    name
                    employmentType
                    description
                    summary
                }
            }
        }

        positions {
            results {
                id
                name
                description
                summary
            }
        }

        youtubeVideos {
            results {
                id
                videoUrl
                releaseDate
                title
                thumbnail {
                    url
                    name
                }
            }
        }

        voxpopEpisodes {
            results {
                id
                episodeNumber
                releaseDate
                title
                videoUrl
                thumbnail {
                    url
                    name
                }
            }
        }

        podcastEpisodes {
            results {
                id
                episodeNumber
                releaseDate
                title
                videoUrl
                thumbnail {
                    url
                    name
                }
            }
        }

        reports {
            results {
                id
                title
                status
                publishedDate
                reportFile {
                    url
                    name
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

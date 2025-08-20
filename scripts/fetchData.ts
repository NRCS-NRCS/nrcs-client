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

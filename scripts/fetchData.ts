import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";
import path from "path";

const datadir = path.join(__dirname, "../data");
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN || "http://localhost:8000/graphql/";
  const pipelineType = process.env.PIPELINE_TYPE;


const client = new GraphQLClient(GRAPHQL_ENDPOINT);


const dummyData = {
    strategicDirectives:[] ,
    departments:[] ,
    news:[] ,
    jobVacancies:[] ,
    highlights:[] ,
    blogs:[] ,
    majorResponsibilities:[] ,
    partners:[] ,
    procurements:[] ,
    resources:[] ,
    projects:[] ,
    faqs:[] ,
    radioProgram:[] ,
};

const query = gql`
  query AllQuery {
    strategicDirectives {
      title
      slug
      id
      description
      contactPersonName
      contactPersonEmail
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
      file {
        name
        url
      }
      coverImage {
        url
        name
      }
    }
    jobVacancies {
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
    blogs {
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
    majorResponsibilities {
      title
      slug
      id
      description
    }
    partners {
      title
      scope
      image {
        url
        size
        name
      }
      id
    }
    procurements {
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
    resources(filters: {}) {
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
      directive {
        pk
      }
    }
    projects {
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
    faqs {
      answer
      id
      orderIndex
      question
    }
    radioProgram {
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
`;

async function fetchAndWriteData() {
  console.log("Fetching data from GraphQL endpoint from ", GRAPHQL_ENDPOINT);

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
  const outputPath = path.join(__dirname, "../data/staticData.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Data written to ${outputPath}`);
  console.log(`Top-level keys: ${Object.keys(data ?? {}).join(", ")}`);
}

fetchAndWriteData();

import rawStaticData from '#data/staticData.json';
import {
    type BlogsQuery,
    type DepartmentsQuery,
    type FaqsQuery,
    type JobVacanciesQuery,
    type MajorResponsibilitiesQuery,
    type NewsQuery,
    type PartnersQuery,
    type ProcurementsQuery,
    type ProjectsQuery,
    type RadioProgramQuery,
    type ResourcesQuery,
    type StrategicDirectiveQuery,
} from '#generated/types/graphql';

type ResultsOf<T extends { results: unknown }> = { results: NonNullable<T>['results'] };

export interface StaticData {
    strategicDirectives: ResultsOf<StrategicDirectiveQuery['strategicDirectives']>;
    departments: ResultsOf<DepartmentsQuery['departments']>;
    news: ResultsOf<NewsQuery['news']>;
    jobVacancies: ResultsOf<JobVacanciesQuery['jobVacancies']>;
    highlights: ResultsOf<NewsQuery['news']>;
    blogs: ResultsOf<BlogsQuery['blogs']>;
    majorResponsibilities: ResultsOf<MajorResponsibilitiesQuery['majorResponsibilities']>;
    partners: ResultsOf<PartnersQuery['partners']>;
    procurements: ResultsOf<ProcurementsQuery['procurements']>;
    resources: ResultsOf<ResourcesQuery['resources']>;
    projects: ResultsOf<ProjectsQuery['projects']>;
    faqs: ResultsOf<FaqsQuery['faqs']>;
    radioProgram: ResultsOf<RadioProgramQuery['radioProgram']>;
}

const staticData = rawStaticData as unknown as StaticData;

export default staticData;

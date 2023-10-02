import { configureStore } from '@reduxjs/toolkit'
import { job_seeker_slice } from './job_seeker_redux/slices/job_seeker_slice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobSeekerCategorySlice } from './job_seeker_redux/slices/job_seeker_category';
import { jobSeekerSkillSlice } from './job_seeker_redux/slices/job_seeker_skills';
import { job_seeker_language } from './job_seeker_redux/slices/job_seeker_language_slice';
import { job_seeker_education } from './job_seeker_redux/slices/job_seeker_education';
import { job_seeker_certificates } from './job_seeker_redux/slices/job_seeker_certificates';
import { job_seeker_experience } from './job_seeker_redux/slices/job_seeker_experiences';
import { job_seeker_trainings } from './job_seeker_redux/slices/job_seeker_trainings';
import { job_seeker_social_links } from './job_seeker_redux/slices/job_seeker_social_links';
import { job_seeker_references } from './job_seeker_redux/slices/job_seeker_references';
import { employer_auth_slice } from './employer_redux/slices/Employer_auth_slice';
import { employer_job_offer } from './employer_redux/slices/Employer_job_offer';

export const store = configureStore({
    reducer: {
        [job_seeker_slice.reducerPath]: job_seeker_slice.reducer,
        [jobSeekerCategorySlice.reducerPath]: jobSeekerCategorySlice.reducer,
        [jobSeekerSkillSlice.reducerPath]: jobSeekerSkillSlice.reducer,
        [job_seeker_language.reducerPath]: job_seeker_language.reducer,
        [job_seeker_education.reducerPath]: job_seeker_education.reducer,
        [job_seeker_certificates.reducerPath]: job_seeker_certificates.reducer,
        [job_seeker_experience.reducerPath]: job_seeker_experience.reducer,
        [job_seeker_trainings.reducerPath]: job_seeker_trainings.reducer,
        [job_seeker_references.reducerPath]: job_seeker_references.reducer,
        [job_seeker_social_links.reducerPath]: job_seeker_social_links.reducer,
        [employer_auth_slice.reducerPath]: employer_auth_slice.reducer,
        [employer_job_offer.reducerPath]: employer_job_offer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(job_seeker_slice.middleware)
        .concat(jobSeekerCategorySlice.middleware)
        .concat(jobSeekerSkillSlice.middleware)
        .concat(job_seeker_language.middleware)
        .concat(job_seeker_education.middleware)
        .concat(job_seeker_certificates.middleware)
        .concat(job_seeker_experience.middleware)
        .concat(job_seeker_trainings.middleware)
        .concat(job_seeker_social_links.middleware)
        .concat(job_seeker_references.middleware)
        .concat(employer_auth_slice.middleware)
        .concat(employer_job_offer.middleware)
});
setupListeners(store.dispatch);
import { configureStore } from '@reduxjs/toolkit'
import { job_seeker_slice } from './slices/job_seeker_slice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobSeekerCategorySlice } from './slices/job_seeker_category';
import { jobSeekerSkillSlice } from './slices/job_seeker_skills';
import { job_seeker_language } from './slices/job_seeker_language_slice';
import { job_seeker_education } from './slices/job_seeker_education';
import { job_seeker_certificates } from './slices/job_seeker_certificates';
import { job_seeker_experience } from './slices/job_seeker_experiences';
import { job_seeker_trainings } from './slices/job_seeker_trainings';
import { job_seeker_social_links } from './slices/job_seeker_social_links';
import { job_seeker_references } from './slices/job_seeker_references';

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
});
setupListeners(store.dispatch);
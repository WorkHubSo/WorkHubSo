import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_trainings = createApi({
    reducerPath: 'jobSeekerTrainingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result)
            }
            return headers;
        }
    }),
    tagTypes: ['trainings'],
    endpoints: (builder) => ({
        addJobSeekerTraining: builder.mutation({
            query: (newTraining) => ({
                url: '/training/add',
                method: 'POST',
                body: newTraining
            }),
            invalidatesTags: ['trainings']
        }),
        updateJobSeekerTraining: builder.mutation({
            query: ({ id, updateTraining }) => ({
                url: `/training/${id}`,
                method: 'PUT',
                body: updateTraining
            }),
            invalidatesTags: ['trainings']
        }),
        deleteJobSeekerTraining: builder.mutation({
            query: (id) => ({
                url: `/training/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['trainings']
        }),
        getJobSeekerTrainings: builder.query({
            query: () => {
                return {
                    url: '/training',
                    method: 'GET',
                }
            },
            providesTags: ['trainings']
        }),
        getCurrentJobSeekerTrainings: builder.query({
            query: () => {
                return {
                    url: '/training/current',
                    method: 'GET',
                }
            },
            providesTags: ['trainings']
        }),
        getJobSeekerTrainingById: builder.query({
            query: (id) => {
                return {
                    url: `/training/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['trainings']
        }),
    })
})


export const {
    useAddJobSeekerTrainingMutation,
    useUpdateJobSeekerTrainingMutation,
    useDeleteJobSeekerTrainingMutation,
    useGetCurrentJobSeekerTrainingsQuery,
    useGetJobSeekerTrainingByIdQuery,
    useGetJobSeekerTrainingsQuery
} = job_seeker_trainings;
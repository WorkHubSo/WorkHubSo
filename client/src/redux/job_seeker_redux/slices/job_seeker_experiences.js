import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_experience = createApi({
    reducerPath: 'jobSeekerExperience',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result)
            }
            return headers
        }
    }),
    tagTypes: ['experience'],
    endpoints: (builder) => ({
        addJobSeekerExperience: builder.mutation({
            query: (newExperience) => ({
                url: '/experience/add',
                method: 'POST',
                body: newExperience
            }),
            invalidatesTags: ['experience']
        }),
        updateJobSeekerExperience: builder.mutation({
            query: ({ id, UpdateExperience }) => ({
                url: `/experience/${id}`,
                method: 'PUT',
                body: UpdateExperience
            }),
            invalidatesTags: ['experience']
        }),
        deleteJobSeekerExperience: builder.mutation({
            query: (id) => ({
                url: `/experience/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['experience']
        }),
        getJobSeekerExperiences: builder.query({
            query: () => {
                return {
                    url: '/experience',
                    method: 'GET',
                }
            },
            providesTags: ['experience']
        }),
        getCurrentJobSeekerExperiences: builder.query({
            query: () => {
                return {
                    url: '/experience/current',
                    method: 'GET',
                }
            },
            providesTags: ['experience']
        }),
        getJobSeekerExperiencesById: builder.query({
            query: (id) => {
                return {
                    url: `/experience/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['experience']
        }),
    })
})

export const {
    useAddJobSeekerExperienceMutation,
    useUpdateJobSeekerExperienceMutation,
    useDeleteJobSeekerExperienceMutation,
    useGetJobSeekerExperiencesByIdQuery,
    useGetCurrentJobSeekerExperiencesQuery,
    useGetJobSeekerExperiencesQuery
} = job_seeker_experience;
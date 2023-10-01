import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_education = createApi({
    reducerPath: 'jobSeekerEducationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (header) => {
            const result = getToken()
            if (result) {
                header.set('Authorization', result)
            }
            return header
        }
    }),
    tagTypes: ['education'],
    endpoints: (builder) => ({
        addJobSeekerEducation: builder.mutation({
            query: (newEducation) => ({
                url: '/education/add',
                method: 'POST',
                body: newEducation
            }),
            invalidatesTags: ['education']
        }),
        updateJobSeekerEducation: builder.mutation({
            query: ({ id, updateEducation }) => ({
                url: `/education/${id}`,
                method: 'PUT',
                body: updateEducation
            }),
            invalidatesTags: ['education']
        }),
        deleteJobSeekerEducation: builder.mutation({
            query: (id) => ({
                url: `/education/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['education']
        }),
        getJobSeekerEducation: builder.query({
            query: () => {
                return {
                    url: '/education',
                    method: 'GET'
                }
            },
            providesTags: ['education']
        }),
        getCurrentJobSeekerEducation: builder.query({
            query: () => {
                return {
                    url: '/education/current',
                    method: 'GET'
                }
            },
            providesTags: ['education']
        }),
        getJobSeekerEducationById: builder.query({
            query: (id) => {
                return {
                    url: `/education/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['education']
        }),
    })
})

export const {
    useAddJobSeekerEducationMutation,
    useUpdateJobSeekerEducationMutation,
    useDeleteJobSeekerEducationMutation,
    useGetCurrentJobSeekerEducationQuery,
    useGetJobSeekerEducationByIdQuery,
    useGetJobSeekerEducationQuery
} = job_seeker_education
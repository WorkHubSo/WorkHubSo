import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_references = createApi({
    reducerPath: 'jobSeekerReferencesApi',
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
    tagTypes: ['references'],
    endpoints: (builder) => ({
        addJobSeekerReference: builder.mutation({
            query: (newReference) => ({
                url: '/reference/add',
                method: 'POST',
                body: newReference
            }),
            invalidatesTags: ['references']
        }),
        updateJobSeekerReference: builder.mutation({
            query: ({ id, updateReference }) => ({
                url: `/reference/${id}`,
                method: 'PUT',
                body: updateReference
            }),
            invalidatesTags: ['references']
        }),
        deleteJobSeekerReference: builder.mutation({
            query: (id) => ({
                url: `/reference/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['references']
        }),
        getJobSeekerReferences: builder.query({
            query: () => {
                return {
                    url: '/reference',
                    method: 'GET',
                }
            },
            providesTags: ['references']
        }),
        getCurrentJobSeekerReferences: builder.query({
            query: () => {
                return {
                    url: '/reference/current',
                    method: 'GET',
                }
            },
            providesTags: ['references']
        }),
        getJobSeekerReferenceById: builder.query({
            query: (id) => {
                return {
                    url: `/reference/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['references']
        })
    })
})


export const {
    useAddJobSeekerReferenceMutation,
    useUpdateJobSeekerReferenceMutation,
    useDeleteJobSeekerReferenceMutation,
    useGetCurrentJobSeekerReferencesQuery,
    useGetJobSeekerReferenceByIdQuery,
    useGetJobSeekerReferencesQuery
} = job_seeker_references
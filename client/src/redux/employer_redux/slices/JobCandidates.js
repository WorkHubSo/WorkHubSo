import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employer_base_url } from "../Employer_base_url";
export const job_candidates = createApi({
    reducerPath: 'jobCandidates',
    baseQuery: fetchBaseQuery({
        baseUrl: Employer_base_url,
    }),
    tagTypes: ['jobCandidate'],
    endpoints: (builder) => ({
        addJobCandidate: builder.mutation({
            query: (newCandidate) => (
                console.log('newCandidate', newCandidate), {
                    url: '/employerCandidate/add',
                    method: 'POST',
                    body: newCandidate
                }),
            invalidatesTags: ['jobCandidate']
        }),
        updateJobCandidate: builder.mutation({
            query: ({ id, updateCandidate }) => (
                console.log('updateCandidate', updateCandidate), {
                    url: `/employerCandidate/${id}`,
                    method: 'PUT',
                    body: updateCandidate
                }),
            invalidatesTags: ['jobCandidate']
        }),
        deleteJobCandidate: builder.mutation({
            query: (id) => ({
                url: `/employerCandidate/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['jobCandidate']
        }),
        getJobCandidate: builder.query({
            query: () => {
                return {
                    url: '/employerCandidate',
                    method: 'GET',
                }
            },
            providesTags: ['jobCandidate']
        })
    })
})

export const {
    useAddJobCandidateMutation,
    useUpdateJobCandidateMutation,
    useDeleteJobCandidateMutation,
    useGetJobCandidateQuery
} = job_candidates
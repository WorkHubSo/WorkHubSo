import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_language = createApi({
    reducerPath: 'jobSeekerLanguageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result);
            }
            return headers;
        }
    }),
    tagTypes: ['language'],
    endpoints: (builder) => ({
        addJobSeekerLanguage: builder.mutation({
            query: (newLanguage) => ({
                url: '/language/add',
                method: 'POST',
                body: newLanguage
            }),
            invalidatesTags: ['language']
        }),
        updateJobSeekerLanguage: builder.mutation({
            query: ({ id, updateLanguage }) => ({
                url: `/language/${id}`,
                method: 'PUT',
                body: updateLanguage
            }),
            invalidatesTags: ['language']
        }),
        deleteJobSeekerLanguage: builder.mutation({
            query: (id) => ({
                url: `/language/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['language']
        }),
        getCurrentJobSeekerLanguage: builder.query({
            query: () => {
                return {
                    url: '/language/current',
                    method: 'GET',
                }
            },
            providesTags: ['language']
        }),
        getJobSeekersLanguage: builder.query({
            query: () => {
                return {
                    url: '/language',
                    method: 'GET',
                }
            },
            providesTags: ['language']
        }),
        getJobSeekerLanguage: builder.query({
            query: (id) => {
                return {
                    url: `/language/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['language']
        })
    })
})

export const {
    useAddJobSeekerLanguageMutation,
    useUpdateJobSeekerLanguageMutation,
    useDeleteJobSeekerLanguageMutation,
    useGetCurrentJobSeekerLanguageQuery,
    useGetJobSeekersLanguageQuery,
    useGetJobSeekerLanguageQuery
} = job_seeker_language
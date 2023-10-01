import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_social_links = createApi({
    reducerPath: 'jobSeekerSocialLinksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result);
            }
            return headers
        }
    }),
    tagTypes: ['social_links'],
    endpoints: (builder) => ({
        addJobSeekerSocialLinks: builder.mutation({
            query: (newSocialLinks) => ({
                url: '/socialProfile/add',
                method: 'POST',
                body: newSocialLinks
            }),
            invalidatesTags: ['social_links']
        }),
        updateJobSeekerSocialLinks: builder.mutation({
            query: ({ id, updateSocialLinks }) => ({
                url: `/socialProfile/${id}`,
                method: 'PUT',
                body: updateSocialLinks
            }),
            invalidatesTags: ['social_links']
        }),
        deleteJobSeekerSocialLinks: builder.mutation({
            query: (id) => ({
                url: `/socialProfile/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['social_links']
        }),
        getJobSeekerSocialLinks: builder.query({
            query: () => {
                return {
                    url: '/socialProfile',
                    method: 'GET',
                }
            },
            providesTags: ['social_links']
        }),
        getCurrentJobSeekerSocialLink: builder.query({
            query: () => {
                return {
                    url: '/socialProfile/current',
                    method: 'GET',
                }
            },
            providesTags: ['social_links']
        }),
        getJobSeekerSocialLinkById: builder.query({
            query: (id) => {
                return {
                    url: `/socialProfile/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['social_links']
        }),
    })
})

export const {
    useAddJobSeekerSocialLinksMutation,
    useUpdateJobSeekerSocialLinksMutation,
    useDeleteJobSeekerSocialLinksMutation,
    useGetJobSeekerSocialLinksQuery,
    useGetCurrentJobSeekerSocialLinkQuery,
    useGetJobSeekerSocialLinkByIdQuery
} = job_seeker_social_links;
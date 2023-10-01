import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const jobSeekerCategorySlice = createApi({
    reducerPath: 'jobSeekerCategoryApi',
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
    tagTypes: ['category'],
    endpoints: (builder) => ({
        addJobseekerCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/category/add',
                method: 'POST',
                body: newCategory
            }),
            invalidatesTags: ['category']
        }),
        updateJobSeekerCategory: builder.mutation({
            query: ({ id, updateCategory }) => (
                console.log('update category', updateCategory), {
                    url: `/category/${id}`,
                    method: 'PUT',
                    body: updateCategory
                }),
            invalidatesTags: ['category']
        }),
        deleteJobSeekerCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category']
        }),
        getJobSeekerCategory: builder.query({
            query: () => {
                return {
                    url: '/category/current',
                    method: 'GET'
                }
            },
            providesTags: ['category']
        }),
        getJobSeekerCategories: builder.query({
            query: () => {
                return {
                    url: '/category',
                    method: 'GET'
                }
            },
            providesTags: ['category']
        })
    })
})

export const { useAddJobseekerCategoryMutation, useUpdateJobSeekerCategoryMutation, useDeleteJobSeekerCategoryMutation, useGetJobSeekerCategoryQuery, useGetJobSeekerCategoriesQuery } = jobSeekerCategorySlice
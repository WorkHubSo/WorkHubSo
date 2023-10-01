import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const jobSeekerSkillSlice = createApi({
    reducerPath: 'jobSeekerSkillsApi',
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
    tagTypes: ['skill'],
    endpoints: (builder) => ({
        addJobSeekerSkills: builder.mutation({
            query: (newSkills) => ({
                url: '/skill/add',
                method: 'POST',
                body: newSkills
            }),
            invalidatesTags: ['skill']
        }),
        updateJobSeekerSkills: builder.mutation({
            query: ({ id, updateSkill }) => ({
                url: `/skill/${id}`,
                method: 'PUT',
                body: updateSkill
            }),
            invalidatesTags: ['skill']
        }),
        deleteJobSeekerSkills: builder.mutation({
            query: (id) => ({
                url: `/skill/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['skill']
        }),
        getJobSeekerSkills: builder.query({
            query: () => {
                return {
                    url: '/skill',
                    method: 'GET'
                }
            },
            providesTags: ['skill']
        }),
        getCurrentJobSeekerSkills: builder.query({
            query: () => {
                return {
                    url: '/skill/current',
                    method: 'GET'
                }
            },
            providesTags: ['skill']
        }),
        getJobSeekerSkill: builder.query({
            query: (id) => {
                return {
                    url: `/skill/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['skill']
        })
    })
})

export const {
    useAddJobSeekerSkillsMutation,
    useUpdateJobSeekerSkillsMutation,
    useDeleteJobSeekerSkillsMutation,
    useGetJobSeekerSkillsQuery,
    useGetCurrentJobSeekerSkillsQuery,
    useGetJobSeekerSkillQuery
} = jobSeekerSkillSlice
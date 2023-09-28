import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Job_seeker_base_url } from '../Job_seeker_base_url'
import Cookies from 'js-cookie'

function setToken(token) {
    return Cookies.set('jobSeekerToken', token)
}
export const job_seeker_slice = createApi({
    reducerPath: 'job_seeker_slice',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url
    }),
    tagTypes: ['job_seeker'],
    endpoints: (builder) => ({
        registerJobSeeker: builder.mutation({
            query: (newJobSeeker) => ({
                url: '/register',
                method: 'POST',
                body: newJobSeeker
            }),
            invalidatesTags: ['job_seeker']
        }),
        loginJobSeeker: builder.mutation({
            query: (LoginJobSeeker) => ({
                url: '/login',
                method: 'POST',
                body: LoginJobSeeker
            }),
            onQueryStarted: async(args, { queryFullfilled }) => {
                try {
                    const result = await queryFullfilled
                    setToken(result.data.token)
                } catch (error) {
                    console.log('error', error.message);
                }
            },
            invalidatesTags: ['job_seeker']
        }),
        updateJobSeeker: builder.mutation({
            query: ({ id, UpdateJobSeeker }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: UpdateJobSeeker
            }),
            invalidatesTags: ['job_seeker']
        }),
        deleteCurrentJobSeeker: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['job_seeker']
        }),
        getJobSeekers: builder.query({
            query: () => {
                return {
                    url: '/',
                    method: 'GET',
                }
            },
            providesTags: ['job_seeker']
        }),
        getCurrentJobSeeker: builder.query({
            query: (id) => {
                return {
                    url: `/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['job_seeker']
        })
    })
})

export const {
    useRegisterJobSeekerMutation,
    useLoginJobSeekerMutation,
    useUpdateJobSeekerMutation,
    useGetCurrentJobSeekerQuery,
    useGetJobSeekersQuery,
    useDeleteCurrentJobSeekerMutation
} = job_seeker_slice;
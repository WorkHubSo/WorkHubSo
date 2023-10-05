import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employer_base_url } from "../Employer_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('employerToken')
}
const setToken = (token) => {
    return Cookies.set('employerToken', token)
}
export const employer_auth_slice = createApi({
    reducerPath: 'employerAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Employer_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result)
            }
            return headers
        }
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        registerEmployerAuth: builder.mutation({
            query: (newEmployer) => ({
                url: '/employer/register',
                method: 'POST',
                body: newEmployer
            }),
            invalidatesTags: ['auth']
        }),
        loginEmployerAuth: builder.mutation({
            query: (loginEmployer) => ({
                url: '/employer/login',
                method: 'POST',
                body: loginEmployer
            }),
            onQueryStarted: async(args, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        setToken(result.data.token)
                    } else {
                        console.log('not found', result);
                    }
                } catch (error) {
                    console.log('error', error);
                }
            },
            invalidatesTags: ['auth']
        }),
        updateEmployerAuth: builder.mutation({
            query: ({ id, updateEmployer }) => (
                console.log('updateEmployer', updateEmployer), {
                    url: `/employer/${id}`,
                    method: 'PUT',
                    body: updateEmployer
                }),
            invalidatesTags: ['auth']
        }),
        deleteEmployerAuth: builder.mutation({
            query: (id) => ({
                url: `/employer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['auth']
        }),
        getEmployersAuth: builder.query({
            query: () => {
                return {
                    url: '/employer',
                    method: 'GET'
                }
            },
            providesTags: ['auth']
        }),
        getCurrentEmployerAuth: builder.query({
            query: () => {
                return {
                    url: '/employer/current',
                    method: 'GET'
                }
            },
            providesTags: ['auth']
        }),
        getEmployerAuthbyId: builder.query({
            query: (id) => {
                return {
                    url: `/employer/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['auth']
        }),
        getEmployerCurrentPassword: builder.query({
            query: (currentPassword) => {
                return {
                    url: '/employer/currentPassword',
                    method: 'GET',
                    body: currentPassword
                }
            },
            providesTags: ['auth']
        }),
        changePassword: builder.mutation({
            query: ({ id, updatePassword }) => ({
                url: `employer/changePassword/${id}`,
                method: 'PUT',
                body: updatePassword
            }),
            invalidatesTags: ['auth']
        }),
    })
})

export const {
    useRegisterEmployerAuthMutation,
    useLoginEmployerAuthMutation,
    useUpdateEmployerAuthMutation,
    useDeleteEmployerAuthMutation,
    useGetEmployersAuthQuery,
    useGetCurrentEmployerAuthQuery,
    useGetEmployerAuthbyIdQuery,
    useChangePasswordMutation,
    useGetEmployerCurrentPasswordQuery
} = employer_auth_slice
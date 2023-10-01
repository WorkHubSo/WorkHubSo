import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job_seeker_base_url } from "../Job_seeker_base_url";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('jobSeekerToken')
}
export const job_seeker_certificates = createApi({
    reducerPath: 'jobSeekerCertificateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Job_seeker_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result)
            }
            return headers;
        }
    }),
    tagTypes: ['certificate'],
    endpoints: (builder) => ({
        addJobSeekerCertificate: builder.mutation({
            query: (newCertificate) => ({
                url: '/certificate/add',
                method: 'POST',
                body: newCertificate
            }),
            invalidatesTags: ['certificate']
        }),
        updateJobSeekerCertificate: builder.mutation({
            query: ({ id, updateCertificate }) => ({
                url: `/certificate/${id}`,
                method: 'PUT',
                body: updateCertificate
            }),
            invalidatesTags: ['certificate']
        }),
        deleteJobSeekerCertificate: builder.mutation({
            query: (id) => ({
                url: `/certificate/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['certificate']
        }),
        getJobSeekerCertificates: builder.query({
            query: () => {
                return {
                    url: '/certificate',
                    method: 'GET'
                }
            },
            providesTags: ['certificate']
        }),
        getCurrentJobSeekerCertificates: builder.query({
            query: () => {
                return {
                    url: '/certificate/current',
                    method: 'GET'
                }
            },
            providesTags: ['certificate']
        }),
        getJobSeekerCertificateById: builder.query({
            query: (id) => {
                return {
                    url: `/certificate/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['certificate']
        })
    })
})

export const {
    useAddJobSeekerCertificateMutation,
    useUpdateJobSeekerCertificateMutation,
    useDeleteJobSeekerCertificateMutation,
    useGetCurrentJobSeekerCertificatesQuery,
    useGetJobSeekerCertificatesQuery,
    useGetJobSeekerCertificateByIdQuery
} = job_seeker_certificates
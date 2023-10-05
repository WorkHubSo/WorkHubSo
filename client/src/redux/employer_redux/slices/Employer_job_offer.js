import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employer_base_url } from "../Employer_base_url";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get('employerToken')
}
export const employer_job_offer = createApi({
    reducerPath: 'employerJobOffer',
    baseQuery: fetchBaseQuery({
        baseUrl: Employer_base_url,
        prepareHeaders: (headers) => {
            const result = getToken();
            if (result) {
                headers.set('Authorization', result)
            }
            return headers;
        }
    }),
    tagTypes: ['jobOffer'],
    endpoints: (builder) => ({
        addJopOffer: builder.mutation({
            query: (newJopOffer) => ({
                url: '/employerjobOffer/add',
                method: 'POST',
                body: newJopOffer
            }),
            invalidatesTags: ['jobOffer']
        }),
        updateJobOffer: builder.mutation({
            query: ({ id, updateJob }) => ({
                url: `/employerjobOffer/${id}`,
                method: 'PUT',
                body: updateJob
            }),
            invalidatesTags: ['jobOffer']
        }),
        deleteJobOffer: builder.mutation({
            query: (id) => ({
                url: `/employerjobOffer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['jobOffer']
        }),
        getJobOffers: builder.query({
            query: () => {
                return {
                    url: '/employerjobOffer',
                    method: 'GET',
                }
            },
            providesTags: ['jobOffer']
        }),
        getCurrentJobOffers: builder.query({
            query: () => {
                return {
                    url: '/employerjobOffer/current',
                    method: 'GET',
                }
            },
            providesTags: ['jobOffer']
        }),
        getJobOffersById: builder.query({
            query: (id) => {
                return {
                    url: `/employerjobOffer/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['jobOffer']
        }),
    })
})

export const {
    useAddJopOfferMutation,
    useUpdateJobOfferMutation,
    useDeleteJobOfferMutation,
    useGetCurrentJobOffersQuery,
    useGetJobOffersByIdQuery,
    useGetJobOffersQuery
} = employer_job_offer;
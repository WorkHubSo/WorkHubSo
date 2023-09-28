import { configureStore } from '@reduxjs/toolkit'
import { job_seeker_slice } from './slices/job_seeker_slice'
import { setupListeners } from '@reduxjs/toolkit/query';
// import {} from '@reduxjs/toolkit/query/react'
export const store = configureStore({
    reducer: {
        [job_seeker_slice.reducerPath]: job_seeker_slice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(job_seeker_slice.middleware)
});
setupListeners(store.dispatch);
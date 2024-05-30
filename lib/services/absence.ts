import noDuplicateTags from 'lib/helpers/no-duplicate-tags';
import apiSetup from '../helpers/api-setup';

export const absences = apiSetup.injectEndpoints({
  endpoints: (builder) => ({
    getLatestAbsence: builder.query({
      query: (_arg?: undefined | null) => '/absences',
      providesTags: (result) => noDuplicateTags(result, 'absences'),
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetLatestAbsenceQuery } = absences;

export const { getLatestAbsence } = absences.endpoints;

export default absences;

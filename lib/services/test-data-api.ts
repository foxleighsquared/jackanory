import noDuplicateTags from 'lib/helpers/no-duplicate-tags';
import apiSetup from '../helpers/api-setup';

export const testDataApi = apiSetup.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: (_arg?: undefined | null) => '/test-data/get-people',
      providesTags: (result) => noDuplicateTags(result, 'TestData'),
      keepUnusedDataFor: 0
    }),
    getPersonByName: builder.query({
      query: (name) => ({
        url: `/test-data/get-people-by-name/${name}`,
        method: 'GET'
      }),
      providesTags: (result) => noDuplicateTags(result, 'TestData'),
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetPeopleQuery, useGetPersonByNameQuery } = testDataApi;

export const { getPeople, getPersonByName } = testDataApi.endpoints;

export default testDataApi;

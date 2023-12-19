import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": "c7b1a0aa02msheadf98b5e12c49fp1bff83jsn8e832a86ae77",
  "X-RapidAPI-Host": "news67.p.rapidapi.com",
};

const BASE_URL = "https://news67.p.rapidapi.com/v2";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/topic-search?search=${newsCategory}&batchSize=${count}&languages=en`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

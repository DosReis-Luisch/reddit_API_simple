import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Define an async thunk for fetching result
export const fetchResult = createAsyncThunk(
    'redditCall/fetchResult',
    async (_, { getState, rejectWithValue }) => {
        // Access `searchQuery` from the state
        const searchQuery = getState().searchQuery.value;
        const searchString = searchQuery.searchValue;
        const isSearchType = searchQuery.isSearchable;

        // Check if the result is already in the store
        const storedResult = isSearchType
            ? getState().redditCall.searchResult.search[searchString]
            : getState().redditCall.searchResult.category[searchString];

        if (storedResult) {
            // Return the stored result instead of making a new API call
            return rejectWithValue({ cached: true, data: storedResult });
        }

        if (searchString !== "") {
            // Form the URL based on search type
            const isSearchUrlParam = isSearchType
                ? `search.json?q=${searchString.split(" ").join("%20")}`
                : `r/${searchString}.json`;
            const link = `https://www.reddit.com/${isSearchUrlParam}`;

            const response = await fetch(link);
            const data = await response.json();
            console.log(data)
            return { data, searchString, isSearchType };
        } else {
            // If there's no search string, return false (or handle as needed)
            return rejectWithValue({ error: "No search query provided" });
        }
    }
);

const initialState = {
    searchResult: {
        searchValue: '',
        searchType: '',
        category: {},
        search: {}
    },
    status: 'idle',
    error: null
};


export const redditCallSlice = createSlice({
    name: "redditCall",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResult.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchResult.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { data, searchString, isSearchType } = action.payload;
                if (isSearchType) {
                    state.searchResult.search[searchString] = data;
                    state.searchResult.searchType = "search";
                } else {
                    state.searchResult.category[searchString] = data;
                    state.searchResult.searchType = "category"
                }
                state.searchResult.searchValue = searchString;
            })
            .addCase(fetchResult.rejected, (state, action) => {
                if (action.payload?.cached) {
                    state.status = "succeeded";  // Mark as succeeded if cached data was used
                } else {
                    state.status = "failed";
                    state.error = action.error?.message || action.payload?.error;
                }
            });
    }
});
export default redditCallSlice.reducer;
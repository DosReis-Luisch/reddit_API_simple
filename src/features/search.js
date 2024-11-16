import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name : "searchQuery",
    initialState : { value: { searchValue: "", isSearchable: true } },
    reducers: {
        updateSearchValue: (state, action) => {
            state.value = action.payload;
        }
    }
});
export const { updateSearchValue } = searchSlice.actions
export default searchSlice.reducer;
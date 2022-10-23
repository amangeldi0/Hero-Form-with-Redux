import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request }= useHttp()
        return request("http://localhost:3001/filters")
    }
)

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers:(builder => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                state.filters = action.payload
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    })

})
const {reducer, actions} = filters

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions

export default reducer;
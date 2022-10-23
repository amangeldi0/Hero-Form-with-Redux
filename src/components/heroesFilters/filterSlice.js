import {createAsyncThunk, createSlice, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request }= useHttp()
        return request("http://localhost:3001/filters")
    }
)

const filtersAdapter = createEntityAdapter()
const  initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

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
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    })

})
const {reducer, actions} = filters

export const { activeFilterChanged } = actions
export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)
export default reducer;
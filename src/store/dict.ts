import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DictResult, DictState} from "../ts/store/dict";
import {getAllDict} from "../apis/dict";

const initialState: DictState = {
    dict: {}
}
const dictStore = createSlice({
    name: 'dict',
    initialState,
    reducers: {
        // setDict: (state, action: PayloadAction<DictResult>) => {
        //     console.log(action.payload, 'dict')
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getDictReducer.fulfilled, (state, action: PayloadAction<DictResult>) => {
            state.dict = action.payload
        })
    }
})

export const getDictReducer = createAsyncThunk(
    'dict/getDict',
    async () => {
        const res = await getAllDict()
        return res.data
    }
)

export default dictStore.reducer

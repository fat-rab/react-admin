import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PermissionState} from "../ts/store/permission";
import {RouteConfig} from "../router";

const initialState: PermissionState = {
    promiseRoutes: []
}
const promiseStore = createSlice({
    name: 'promise',
    initialState,
    reducers: {
        setPromiseRoutes: (state, action: PayloadAction<Array<RouteConfig>>) => {
            state.promiseRoutes = action.payload
        },
        // setPromiseRoutes: (state, action: PayloadAction<{ arr: Array<RouteConfig>, roleArr: Array<string> }>) => {
        //     state.promiseRoutes = formatRoutes(action.payload.arr, action.payload.roleArr)
        // },
    }
})

export const {setPromiseRoutes} = promiseStore.actions
export default promiseStore.reducer

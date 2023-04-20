import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PermissionState} from "../ts/store/permission";
import {RouteConfig} from "../ts/router";

const initialState: PermissionState = {
    promiseRouters: []
}
const promiseStore = createSlice({
    name: 'promise',
    initialState,
    reducers: {
        setPromiseRouters: (state, action: PayloadAction<Array<RouteConfig>>) => {
            state.promiseRouters = action.payload
        },
        removePromiseRouters: (state) => {
            state.promiseRouters = []
        }
        // setPromiseRouters: (state, action: PayloadAction<{ arr: Array<RouteConfig>, roleArr: Array<string> }>) => {
        //     state.promiseRoutes = formatRoutes(action.payload.arr, action.payload.roleArr)
        // },
    }
})

export const {setPromiseRouters,removePromiseRouters} = promiseStore.actions
export default promiseStore.reducer

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {getUserInfo} from "../apis/user";
import {UserState} from "../ts/store/user";

const initialState: UserState = {
    nickname: '',
    roles: [],
    roleNames: [],
    regionId: '',
    regionName: '',
    phone: '',
    deptName: ''
}
const userStore = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            const userInfo = action.payload
            state.nickname = userInfo.nickname
            state.roles = userInfo.roles
            state.roleNames = userInfo.roleNames
            state.regionId = userInfo.regionId
            state.phone = userInfo.phone
            state.regionName = userInfo.regionName
            state.deptName = userInfo.deptName
        },
        removeUserInfo: state => {
            state.nickname = ''
            state.roles = []
            state.roleNames = []
            state.regionId = ''
            state.phone = ''
            state.regionName = ''
            state.deptName = ''
        }
    },
    // extraReducers: (builder) => {
    //     // builder.addCase(getUserInfoReducer.fulfilled, (state, action: PayloadAction<UserState>) => {
    //     //     const userInfo = action.payload
    //     //     state.nickname = userInfo.nickname
    //     //     state.roles = userInfo.roles
    //     //     state.roleNames = userInfo.roleNames
    //     //     state.regionId = userInfo.regionId
    //     //     state.phone = userInfo.phone
    //     //     state.regionName = userInfo.regionName
    //     //     state.deptName = userInfo.deptName
    //     // })
    // }
})
// export const getUserInfoReducer = createAsyncThunk(
//     'user/getUserInfo',
//     async () => {
//         const res = await getUserInfo()
//         return res.data
//
//     }
// )
export const {setUserInfo, removeUserInfo} = userStore.actions
export default userStore.reducer

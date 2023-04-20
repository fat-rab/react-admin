import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userStore from "./user";
import promiseStore from "./promise"
import dictStore from "./dict";

const store = configureStore({
    reducer: {
        user: userStore,
        promise: promiseStore,
        dict: dictStore
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //关闭序列化状态检测中间件
        serializableCheck: false
    }),
})
// 从 store 本身推断出 `RootState` 和 `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
// 类型推断: {user: userStore, ......}
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// 在整个应用中使用，而不是简单的使用 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store

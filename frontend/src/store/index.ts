import { configureStore } from "@reduxjs/toolkit";
import listPageviewDesignReducer from "./slices/listPageDesignSlice";

export const store = configureStore({
  reducer: {
    listPageviewDesign: listPageviewDesignReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// We will need this middleware later
// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "../redux/reducers";
// import rootSaga from "../redux/sagas";

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: () => [sagaMiddleware],
// });
// sagaMiddleware.run(rootSaga);

// export default store;


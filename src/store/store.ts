import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';
import api from './middleware/api';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [apiCallBegan.type],
      },
    }),
    api,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

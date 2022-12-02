import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;

import React from "react";
// import {getHashTags} from "../api/api_twitt";

var TwittStateContext = React.createContext();
var TwittDispatchContext = React.createContext();

function TwitttReducer(state, action) {
  switch (action.type) {
    case "SET_TWITT_TEXT":
      return {...state, twittText: action.payload};
    case "SET_TWITT_LIST":
      return {...state, twittList: action.payload};
    case "SET_HASHTAG_LIST":
      return {...state, hashTags: action.payload};
    case "LIKE_TWITT":
      const twittId = action.payload;
      const foundIndex = state.twittList.findIndex(item => item._id === twittId);
      if (foundIndex === -1)
        return state;
      return {
        ...state,
        twittList: [...state.twittList.slice(0, foundIndex), {
          ...state.twittList[foundIndex],
          likes: state.twittList[foundIndex].likes + 1
        }, ...state.twittList.slice(foundIndex + 1)]
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TwittProvider({children}) {
  var [state, dispatch] = React.useReducer(TwitttReducer, {
    twittText: '',
    twittList: [],
    hashTags: []
  });
  return (
    <TwittStateContext.Provider value={state}>
      <TwittDispatchContext.Provider value={dispatch}>
        {children}
      </TwittDispatchContext.Provider>
    </TwittStateContext.Provider>
  );
}

function useTwittState() {
  var context = React.useContext(TwittStateContext);
  if (context === undefined) {
    throw new Error("useTwittState must be used within a TwittProvider");
  }
  return context;
}

function useTwittDispatch() {
  var context = React.useContext(TwittDispatchContext);
  if (context === undefined) {
    throw new Error("useTwittDispatch must be used within a TwittProvider");
  }
  return context;
}

export {TwittProvider, useTwittState, useTwittDispatch, setTwittText, likeTwitt, setTwittList, setHashTagList,updateHashTagList};

// ###########################################################
function setTwittText(dispatch, twittText) {
  dispatch({
    type: "SET_TWITT_TEXT",
    payload: twittText
  });
}

function likeTwitt(dispatch, id) {
  dispatch({
    type: "LIKE_Twitt",
    payload: id
  });
}

function setTwittList(dispatch, list) {
  dispatch({
    type: "SET_Twitt_LIST",
    payload: list
  });
}

function setHashTagList(dispatch, list) {
  dispatch({
    type: "SET_HASHTAG_LIST",
    payload: list
  });
}

function updateHashTagList(dispatch) {
  getHashTags((isOk, data) => {
    if (isOk) {
      dispatch({
        type: "SET_HASHTAG_LIST",
        payload: data
      });
    }
  })
}



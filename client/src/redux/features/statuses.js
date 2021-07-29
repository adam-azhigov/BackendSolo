const initialState = {
  items: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "status/load/pending":
      return {
        ...state,
        loading: true
      }

    case "status/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }

    case "status/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "status/create/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };

    default:
      return state;
  }
}
export const loadStatus = () => {
  return async (dispatch) => {
    dispatch({ type: "status/load/pending" });

    const response = await fetch("/api/status");
    const json = await response.json();
    dispatch({
      type: "status/load/fulfilled",
      payload: json,
    });
  };
};

export const postStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: "status/create/pending" });
    const response = await fetch("/api/status", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        color: data.color
      }),
    });
    const json = await response.json();
    dispatch({
      type: "status/create/fulfilled",
      payload: json,
    });
    // window.location.reload();
  };
};
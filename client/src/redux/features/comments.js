const initialState = {
  items: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "comment/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case "comment/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "comment/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case "comment/edit/pending":
      return {
        ...state,
        editing: true,
      };
    case "comment/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((report) => {
          if (report.id === action.payload.id) {
            return {
              ...report,
              ...action.payload.data,
            };
          }
          return report;
        }),
      };

    default:
      return state;
  }
}

export const loadComment = (id) => {
  return async (dispatch) => {
    dispatch({ type: "comment/load/pending" });

    const response = await fetch(
      `/api/patient/${id}/comments`
    );
    const json = await response.json();

    dispatch({
      type: "comment/load/fulfilled",
      payload: json,
    });
  };
};

export const postComment = (id, comment) => {
  return async (dispatch) => {
    dispatch({ type: "comment/post/pending" });
    const response = await fetch(
      `/api/patient/${id}/comments`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          text: comment.comment,
          status: comment.stat,
        }),
      }
    );
    const json = await response.json();
    dispatch({
      type: "comment/post/fulfilled",
      payload: json,
    });
  };
};

export const editReport = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "comment/edit/pending" });

    await fetch(`/api/comment/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: data.comment,
        status: data.status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    dispatch({ type: "comment/edit/fulfilled", payload: { id, data } });
    window.location.reload()
  };
};

const initialState = {
  items: [],
  loading: true,
  filter: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "patients/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "patients/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case "patient/delete/pending":
      return {
        ...state,
        deleting: true,
      };

    case "patient/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((user) => user._id !== action.payload),
      };

    case "patient/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "patient/create/fulfilled":
      return {
        ...state,
        loading: true,
        items: action.payload,
      };

    case 'patient/filter/fulfilled':
      return {
        ...state,
        filter: action.payload
      }

    default:
      return state;
  }
}


export const postPatient = (data) => {
  return async (dispatch) => {
    dispatch({ type: "patient/create/pending" });
    const response = await fetch("/api/patient", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        pathToImage: data.image
      }),
    });
    const json = await response.json();
    dispatch({
      type: "patient/create/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};

export const loadPatients = () => {
  return async (dispatch) => {
    dispatch({ type: "patients/load/pending" });

    const response = await fetch("/api/patients");
    const json = await response.json();

    dispatch({
      type: "patients/load/fulfilled",
      payload: json,
    });
  };
};

export const deletePatient = (id) => {
  return async (dispatch) => {
    dispatch({ type: "patient/delete/pending" });

    await fetch(`/api/patient/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "patient/delete/fulfilled", payload: id });
  };
};

export const loadPatientId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "patients/load/pending" });

    const response = await fetch(`/api/patient/${id}`);
    const json = await response.json();

    dispatch({ type: "patients/load/fulfilled", payload: [json] });
  };
};


export const setFilterText = text => {
  return {
    type: 'patient/filter/fulfilled',
    payload: text
  }
}


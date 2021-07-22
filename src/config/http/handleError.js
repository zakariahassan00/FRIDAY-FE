export const handleError = (err, type, dispatch) => {
  if (err.response) {
    if (err.response.status >= 500)
      dispatch({ type, payload: "something went wrong ... please reload the page or try again later" });
    else if (err.response.status === 403) {
      // there should be authorization error handling but its empty for now
      // since there is no authentication in the project
    } else if (err.response.status >= 400)
      dispatch({ type, payload: err.response.data });
  } else
    dispatch({ type, payload: "Connection Lost" });
};
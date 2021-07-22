import { handleError } from './handleError';

export default async function handleReduxDispatch (options, dispatch, callback) {
  try {
    // call the service
    const { data } = await options.service();
    // dispatch action to redux
    dispatch({ type: options.success, payload: data });
    // if there is callback function call it!
    callback && callback(data);
  } catch (err) {
    console.log(err)
    // use error that added "Explicitly" or replace SUCCESS with ERROR : ACTION_TYPE_SUCCESS ==> ACTION_TYPE_ERROR
    let errorType = options.error ? options.error : options.success.replace("SUCCESS", "ERROR") 
    //     Server Error * Error Type * Redux dispatch 
    //           |            |          |
    handleError(err, errorType, dispatch);
  }
}
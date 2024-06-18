import axios from "axios";
import { userActions } from "../users/userSlice";

export const login = async (dispatch, email, password) => {
  try {
    dispatch(userActions.userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `https://karwadenge-server.onrender.com/api/v1/login`,
      { email, password },
      config
    );

    dispatch(
      userActions.userLoginSuccess({
        user: data.user,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      userActions.setError({
        error: e.response.data.message,
        loading: false,
      })
    );
  }
};

// Register
export const register = async (dispatch, userData) => {
  try {
    dispatch(userActions.userRegisterRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      "https://karwadenge-server.onrender.com/api/v1/register",
      userData,
      config
    );

    dispatch(
      userActions.userRegisterSuccess({
        user: data.user,
        loading: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      userActions.setError({
        error: error.response.data.message,
        loading: false,
      })
    );
  }
};

// Load User
export const loadUser = async (dispatch) => {
  try {
    dispatch(userActions.userLoadRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `https://karwadenge-server.onrender.com/api/v1/me`,
      config
    );
    // console.log(data.user);
    dispatch(
      userActions.userLoadSuccess({
        user: data.user,
      })
    );
  } catch (error) {
    // console.log(error);
    dispatch(
      userActions.userLoadFail({
        error: error.response.data.message,
      })
    );
  }
};

// Logout User
export const logout = async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { response } = await axios.get(
      "https://karwadenge-server.onrender.com/api/v1/logout",
      config
    );

    console.log(response);

    dispatch(userActions.userLogOutSuccess());
  } catch (error) {
    console.log(error.response);
    dispatch(
      userActions.setError({
        error: error.response.data.message,
        loading: false,
      })
    );
  }
};

// Clearing Errors
export const clearErrors = async (dispatch) => {
  dispatch(userActions.clearError());
};

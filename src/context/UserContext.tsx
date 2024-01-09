import axios, {AxiosResponse} from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {IState, IProps, IContextValues, IAddUser, IUser} from './types';

const userContext = createContext({} as IContextValues);

const calculatePageCount = (length: number) => {
  return Math.ceil(length / 4);
};

const UserContext = ({children}: IProps) => {
  const [state, setState] = useState<IState>({
    pageNo: 1,
    users: [],
    mode: 'add',
    isOpenModal: false,
    text: '',
    loading: false,
    edit: {
      data: null,
      id: null,
    },
    pageCount: 0,
  });

  const fetchAllUsers = useCallback(async () => {
    let response: AxiosResponse<IUser[]>;

    if (state.text.length >= 2) {
      response = await axios(
        `${process.env.REACT_APP_BASE_URL}/users?q=${state.text}`
      );
    } else {
      response = await axios(`${process.env.REACT_APP_BASE_URL}/users`);
    }

    setState((prevState) => ({
      ...prevState,
      pageCount: calculatePageCount(response?.data.length),
    }));
  }, [state.text]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleAddUser = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      mode: 'add',
    }));
  };

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };

  // handleChange pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
  };

  // ***** Fetch all users per page ***** //
  const fetchUsers = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    let response: AxiosResponse<IUser[]>;

    if (state.text.length >= 2) {
      response = await axios(
        `${process.env.REACT_APP_BASE_URL}/users?q=${state.text}&_page=${state.pageNo}&_limit=4`
      );
    } else {
      response = await axios(
        `${process.env.REACT_APP_BASE_URL}/users?_page=${state.pageNo}&_limit=4`
      );
    }

    setState((prevState) => ({
      ...prevState,
      users: response?.data,
      loading: false,
    }));
  }, [state.pageNo, state.text]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ***** add New User  ***** //
  const addNewUser = async (data: IAddUser) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, data);
      // close Modal
      setState((prevState) => ({
        ...prevState,
        isOpenModal: false,
      }));
      // fetch all user after add new user
      fetchUsers();
      fetchAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (id: number) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      isOpenModal: true,
      mode: 'edit',
    }));

    const response = await axios(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`
    );

    setState((prevState) => ({
      ...prevState,
      edit: {
        data: response.data,
        id: id,
      },
      loading: false,
    }));
  };

  const editUser = async (data: IAddUser) => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${state.edit.id}`,
      data
    );
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`);
    fetchUsers();
    fetchAllUsers();

    if (state.users.length === 1) {
      setState((prevState) => ({
        ...prevState,
        pageNo: prevState.pageNo - 1,
      }));
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      text: event.target.value,
    }));
  };

  const values: IContextValues = {
    ...state,
    handleAddUser,
    handleCloseModal,
    handleChange,
    addNewUser,
    handleEditUser,
    editUser,
    handleDeleteUser,
    handleTextChange,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export default UserContext;
export const useConsumeContext = () => useContext(userContext);

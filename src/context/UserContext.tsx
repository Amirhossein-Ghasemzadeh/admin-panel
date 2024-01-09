import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {IState, IProps, IContextValues, IAddUser} from './types';

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
    if (state.text.length >= 2) {
      const response = await axios(
        `http://localhost:4000/users?q=${state.text}`
      );
      const pageCount = calculatePageCount(response.data.length);
      setState((prevState) => ({
        ...prevState,
        pageCount,
      }));
    } else {
      const response = await axios(`http://localhost:4000/users`);
      const pageCount = calculatePageCount(response.data.length);
      setState((prevState) => ({
        ...prevState,
        pageCount,
      }));
    }
  }, [state.text]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleOpenModal = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
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

    if (state.text.length >= 2) {
      const response = await axios(
        `http://localhost:4000/users?q=${state.text}&_page=${state.pageNo}&_limit=4`
      );
      setState((prevState) => ({
        ...prevState,
        users: response.data,
        loading: false,
      }));
    } else {
      const response = await axios(
        `http://localhost:4000/users?_page=${state.pageNo}&_limit=4`
      );

      setState((prevState) => ({
        ...prevState,
        users: response.data,
        loading: false,
      }));
    }
  }, [state.pageNo, state.text]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ***** add New User  ***** //
  const addNewUser = async (data: IAddUser) => {
    try {
      const response = await axios.post(`http://localhost:4000/users`, data);
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

    const response = await axios(`http://localhost:4000/users/${id}`);

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
    const response = await axios.put(
      `http://localhost:4000/users/${state.edit.id}`,
      data
    );
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
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
    handleOpenModal,
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

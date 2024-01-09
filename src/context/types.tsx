export interface IProps {
  children: React.ReactNode;
}

export interface IAddUser {
  name: string;
  email: string;
  position: string;
  gender: number;
}

export interface IUser extends IAddUser {
  id: number;
}

export interface IState {
  pageNo: number;
  users: IUser[];
  mode: 'add' | 'edit';
  isOpenModal: boolean;
  text: string;
  loading: boolean;
  edit: {
    data: null | IUser;
    id: null | number;
  };
  pageCount: number;
}

export interface IContextValues extends IState {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  addNewUser: (data: IAddUser) => void;
  handleEditUser: (id: number) => void;
  editUser: (data: IAddUser) => void;
  handleDeleteUser: (id: number) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

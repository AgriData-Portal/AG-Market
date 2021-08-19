import create from 'zustand';

export const userStore = create(set => ({
  userName: '',
  userID: '',
  roleInCompany: '',
  userEmail: '',
  userPhoneNumber: '',

  changeUserName: name => set({userName: name}),
  changeUserID: id => set({userID: id}),
  changeRoleInCompany: role => set({roleInCompany: role}),
  changeUserEmail: email => set({userEmail: email}),
  changeUserPhoneNumber: num => set({userPhoneNumber: num}),
}));

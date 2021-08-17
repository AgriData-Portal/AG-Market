import create from 'zustand';

export const companyStore = create(set => ({
  companyName: '',
  companyType: '',
  companyID: '',
  verified: false,
  companyFavouriteStores: [],

  changeCompanyType: type => set({companyType: type}),
  changeCompanyName: name => set({companyName: name}),
  changeCompanyID: id => set({companyID: id}),
  changeVerified: verify => set({verified: verify}),
  changeCompanyFavouriteStores: store => set({companyFavouriteStores: store}),
}));

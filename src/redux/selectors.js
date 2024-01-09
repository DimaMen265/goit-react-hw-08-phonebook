import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.filter.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
    return filter.length > 0 ? contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())) : contacts;
});

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;

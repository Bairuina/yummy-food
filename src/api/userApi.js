import http from './http';

export const getUser = () => http.get('/user/getUser');

export const addUser = (user) => http.post('/user/addUser', user);

export const getVerificationCode = (data) => http.post('/user/getVerificationCode', data);

export const verifyCode = (data) => http.post('/user/verifyCode', data);

export const checkUser = (data) => http.post('/user/checkUser', data);

export const getUserInfo = (userId) => http.post('/user/getUserInfo', userId);

export const addConcernUser = (data) => http.post('/user/addConcernUser', data);

export const updateUserInfo = (data) => http.post('/user/updateUserInfo', data);

export const getConcernList = (data) => http.post('/user/getConcernList', data);

export const getFanList = (data) => http.post('/user/getFanList', data);

export const checkWechatUser = (data) => http.post('/user/checkWechatUser', data);

export const editPassword = (data) => http.post('/user/editPassword', data);

export const loginByPassword = (data) => http.post('/user/loginByPassword', data);

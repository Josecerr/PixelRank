import { showMyAccount } from "../dashboard/dashboard.js";
import { logOutUser } from "../dashboard/dashboard.js";
import { searchFriendsByUsername } from "../dashboard/dashboard.js";
import { showFriend } from "../dashboard/dashboard.js";

//Primero los botones principales

const myAccount = document.getElementById('myAccount');
const logOut = document.getElementById('logout');
const addFriends = document.getElementById('addFriends');
const myFriends = document.getElementById('myFriends');


document.addEventListener('DOMContentLoaded',()=>{

    const imageSrc = document.getElementById('img-data-user');
    imageSrc.src = user.avatar;



})




myAccount.addEventListener('click', () => {

    showMyAccount();


})

logOut.addEventListener('click', () => {

    logOutUser();



})
myFriends.addEventListener('click', () => {

    showFriend();

})

addFriends.addEventListener('click', () => {


    searchFriendsByUsername();

})
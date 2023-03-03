const express = require('express');
const route = require('express').Router();
const {signUp} = require('../controller/signUp.js');
const {login} = require('../controller/login.js');
const {shorten} = require('../controller/shorten.js');
const {profile} = require('../controller/profile.js');
const {getCode} = require('../controller/code.js');


route.post('/signup',signUp)
route.post('/login',login)
route.post('/shorten',shorten)
route.get('/profile',profile)
route.get('/redirect/:code',getCode)

module.exports=route
'use strict'
var express = require('express');
var ChatController = require('../controller/chatController');

var router = express.Router();

//rutas de pruebas
router.post('/datos-curso', ChatController.datosCurso);

//rutas utiles


router.post('/chatsCanal', ChatController.devolverTodosLosChatsCanal);


router.post('/participantes', ChatController.devolverPĂ¤rticipantes);


module.exports = router;


/*global process */

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
const app = express();

import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
import route from './routes.js';
import { checkError, errorMessage } from "./src/middlewares/middleware.js";

import mongoose from 'mongoose';
mongoose.set("strictQuery", true);
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(3000, () => {
      console.log('Acessar http://localhost:3000');
      console.log('Servidor executando na porta 3000');
    });
  }).catch(e => console.log(e));

const sessionOptions = session({
  secret: 'pass',
  store: connectMongo.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use(sessionOptions);
app.use(flash());

app.set('view engine', 'ejs');
app.set('views','./src/views');

app.use(checkError);
app.use(errorMessage);

app.use(route);

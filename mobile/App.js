import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import 'react-native-gesture-handler';

import React from 'react';

import Routes from './src/routes';

//div, p, span, etc, aqqui será diferente!!!
//Vamos usar <div> para tudo
//View no lugar de div, header, footer, side, qualquer container
//Text, para qualquer tipo de texto, sendo p, span, etc
//nao existe herança de estilo no componente do style

export default function App() {
  return (
    <Routes />
  );
};

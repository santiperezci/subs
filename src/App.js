import React from 'react';
import './App.css';
import Sub from './Sub'
import {ApolloProvider,ApolloClient,HttpLink,InMemoryCache,split} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4004/'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4004/`,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});


function App() {

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Sub/>
    </div>
    </ApolloProvider>
  );
}

export default App;

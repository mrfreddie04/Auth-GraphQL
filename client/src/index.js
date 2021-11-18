import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from "react-apollo";

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

//Apollo Store
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include" //safe to send along cookies with outgoing requests
});

const client = new ApolloClient({
  link: link,
  cache: cache  
});

const DashboardwithAuth = requireAuth(Dashboard);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter > 
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<DashboardwithAuth />} />
        </Route>
      </Routes>  
    </BrowserRouter> 
  </ApolloProvider>  ,
  document.querySelector('#root')
);
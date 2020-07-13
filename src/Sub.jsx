import React from 'react';
import {gql, useSubscription} from '@apollo/client'

const SUB = gql`
subscription TellMe($mail: String!,$token: String!, $author: String!){
  tellMe(mail:$mail,token:$token,author:$author)
}
`;

function Sub() {
    const {data,loading,error}= useSubscription(
       SUB,
       {variables:{
           mail:'jf',
           token:'be120480-c50d-11ea-b063-49cea3c4b9fd',
           author:'test'
       }} 
    );
    return <h4 onClick={()=>{console.log(data)}}>New comment:{!loading && data.tellMe} </h4>
  }
  
  export default Sub;
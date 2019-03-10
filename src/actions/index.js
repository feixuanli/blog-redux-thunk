import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async (dispatch) => {
        const response =  await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data });
}       

export const fetchUser = (id) => async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
       //fetchPosts
       await dispatch(fetchPosts());
       // get list of posts 
       //fetchUsers multiple times 
//        const userIds = _.uniq(_.map(getState().posts, 'userId'));
//        userIds.forEach(id => dispatch(fetchUser(id)));

       _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value(); //execute
}


// export const fetchUser = (id) => (dispatch) => {
//         return _.memoize(_fetchUser)(id, dispatch);
//  }
 
//  //private fn 
//  const _fetchUser = (async (id, dispatch) => {
//          const response = await jsonPlaceholder.get(`/users/${id}`);
 
//          dispatch({ type: 'FETCH_USER', payload: response.data });
//  });  


// export const fetchUser = (id) => (dispatch) => {
//        return _fetchUser(id, dispatch);
// }

// //private fn 
// const _fetchUser = _.memoize(async (id, dispatch) => {
//         const response = await jsonPlaceholder.get(`/users/${id}`);

//         dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// export const fetchUser = function(id) {
//         return  _.memoize(async function (dispatch){
//                 const response = await jsonPlaceholder.get(`/users/${id}`);
        
//                 dispatch({ type: 'FETCH_USER', payload: response.data });
//         });
// };





// export const fetchPosts = () => {
//     return async (dispatch, getState) => {
//         const response =  await jsonPlaceholder.get('/posts');

//         dispatch({ type: 'FETCH_POSTS', payload: response });
//     }       
// };

// export const fetchPosts = async () => {
//         const response = await jsonPlaceholder.get('/posts');
    
    
//         return {
//             type: 'FETCH_POST',
//             payload: response
//         };       
//     };
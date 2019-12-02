import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
  const { type, payload} = action

  switch(type) {
    case 'add_blogpost':
      return [
        ...state, 
        { 
          id: Math.floor(Math.random() * 99999),
          title: payload.title,
          content: payload.content
        }
      ]
    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost.id !== action.payload)
    default:
      return state  
  }
}

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: {title, content} })
    callback()
  }
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id})
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer, 
  { addBlogPost, deleteBlogPost },
  [{title: 'TEST POST', content: 'TEST CONTENT', id: 1}]
)
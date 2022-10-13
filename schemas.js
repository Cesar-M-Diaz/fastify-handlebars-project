const postInfoOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { 
          type: 'string',
          minLength: 2
        },
        email: { 
          type: 'string',
          minLength: 2
        }
      }
    }
  }
}

const userIdOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { 
          type: 'string'
        }
      }
    }
  }
}

module.exports = {
  postInfoOpts,
  userIdOpts
}
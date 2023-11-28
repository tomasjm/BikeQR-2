import React from 'react'
import { api } from '~/utils/api'

function HelloWorld () {
  const getUsers = api.user.all.useQuery().data ?? []
  return (
    <div>

      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        getUsers?.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))
    }
    </div>
  )
}

export default HelloWorld
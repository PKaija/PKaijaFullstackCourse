import React from 'react'
import store from '../store'

const UserList = () => {
    
    var users = store.getState().allUsers
    

    return (
        <div>
            <h3>Users</h3>
            <table>
            <tbody>
            <tr>
                <th>User</th>
                <th>Blogs</th>
            </tr>
            {users.map(user =>
                 <tr key={user.id}>
                    <th><a href={`/users/${user.id}`}>{user.username}</a></th>
                    <th>{user.blogs.length}</th>
                </tr>)
            }
            </tbody>
            </table>
        </div>
    )
}

export default UserList
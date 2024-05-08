import {feathers} from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://localhost:3032',{transports: ['websocket']});
const client = feathers();
client.configure(socketio(socket));

socket.on('connect', () => {
    const token=window.localStorage.getItem('feathers-jwt')
    if(!token)return
    socket.emit(
      'create',
      'authentication',
      {
        strategy: 'jwt',
        accessToken: token
      },
      function (error, newAuthResult) {
        window.localStorage.setItem('feathers-jwt',newAuthResult.accessToken)
      }
    )
})
export  default client;

export function login({email,password}) {
    socket.emit(
        'create',
        'authentication',
        {
          strategy: 'local',
          email: 'hello@feathersjs.com',
          password: 'supersecret'
        },
        function (error, authResult) {
          console.log(authResult)
          // authResult will be {"accessToken": "your token", "user": user }
          // You can now send authenticated messages to the server
          window.localStorage.setItem('feathers-jwt',authResult.accessToken)
        }
      )
}

export function logout() {
    window.localStorage.clear()
    socket.off('connect')
    socket.close()
    socket=null
}
// @ts-nocheck
import net from 'net';

const server = net.createServer();
server.listen(8080);

let remoteClientInfo = {}

server.on('connection', (socket: any) => {
  console.log('client connection', socket.remoteAddress, socket.remotePort);

  socket.on('data', (res: string) => {
    if (res.toString() === 'sun') {
        return socket.write(JSON.stringify({
            ipv4: socket.remoteAddress?.replace('::ffff:', ''),
            exportPort: socket.remotePort
        }));
    }
    const data = JSON.parse(res);
    console.log('recieve type', data?.type)
    if (data.type === 'nat:request') {
      remoteClientInfo = {
        address: socket.remoteAddress?.replace('::ffff:', ''),
        port: socket.remotePort
      }
      socket.write(JSON.stringify({
        type: 'nat:response',
        data: {
          address: socket.remoteAddress?.replace('::ffff:', ''),
          port: socket.remotePort
        }
      }));
    } else if (data.type === 'nat:send') {
        console.log('start connect client', remoteClientInfo)
        const client = net.createConnection({
            host: remoteClientInfo.address,
            port: remoteClientInfo.port
        })

        client.on('connect', () => {
            console.log('connect to client success')
        })

        client.on('error', (err) => {
            console.log('connect to client err', err)
        })
    }
  })
})
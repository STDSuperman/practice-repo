import net from 'net';

const remoteServerConn = net.createConnection({
  host: '117.78.2.215',
  port: 8080,
})

remoteServerConn.on('connect', () => {
    remoteServerConn.write(JSON.stringify({
    type: 'nat:request'
  }));
})

remoteServerConn.on('data', async (data: string) => {
  const response = JSON.parse(data);
  const pubPort = response.data.port;
  console.log('response: ', response)

  const localServer = net.createServer().listen(pubPort)

  localServer.on('listening', () => {
    console.log('local server listening')

    remoteServerConn.write(JSON.stringify({
        type: 'nat:send'
    }))
  })

  localServer.on('connection', (socket) => {
    console.log('start connect', socket)
    const natServer = net.connect({
      host: '192.168.124.110',
      port: 8080,
    }, () => {
      console.log('local nat connection established')
    });

    natServer.on('error', (err) => {
      console.log('err: ', err)
    })
  })

  localServer.on('error', (err) => {
    console.log(err)
  })

  localServer.on('error', (err) => {
    console.log('local server err', err)
  })
})

// import { FantasyNatService } from 'fantasy-nat-sdk'
// const config: any = {
//     localServerConfig: [
//         {
//             serverAlias: 'server1',
//             ip: '192.168.124.110',
//             port: 8080,
//             timeout: 5000,
//         },
//         // {
//         //     serverAlias: 'serverDll',
//         //     ip: "192.168.31.214",
//         //     port: 5500
//         // }
//     ],
//     remoteServerIp: '117.78.2.215',
//     remoteServerPort: 8080,
// }
// new FantasyNatService(config).run()
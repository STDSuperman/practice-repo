import fse from 'fs-extra'
import path from 'path'

let port = 6379;
let idx = 1

while (port <= 6384) {
  const targetPath = path.resolve(__dirname, 'data', `node${idx++}`);
  if (fse.existsSync(targetPath)) {
    fse.removeSync(targetPath)
  }
  fse.ensureDirSync(targetPath)
  const redisConfPath = path.resolve(targetPath, 'redis.conf')
  fse.writeFileSync(redisConfPath, `\
  port ${port}
  requirepass 1234
  bind 0.0.0.0
  protected-mode no
  daemonize no
  appendonly yes
  cluster-enabled yes 
  cluster-config-file nodes.conf
  cluster-node-timeout 5000
  cluster-announce-ip  192.168.1.102
  cluster-announce-port ${port}
  cluster-announce-bus-port 1${port}\
  `)
  port++;
}
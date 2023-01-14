import { connect, Connection } from '@planetscale/database'
import env from 'app/environment'

let connection: Connection

export const initialize = async () => {
  connection = connect({
    url: env.PLANETSCALE_URL
  })

  return connection
}

export const init = (): Connection => {
  if (!connection) {
    throw new Error("unable connection")
  }

  return connection
}
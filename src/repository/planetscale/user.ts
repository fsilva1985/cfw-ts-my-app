import { Connection } from '@planetscale/database'
import { init as InitDatabase } from "../../driver/database/planetscale"
import { User } from '../../domain/entity/user'

export class UserRepository {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async all(): Promise<User[]> {
    const results = await this.connection.execute('SELECT * FROM user')

    return results.rows.map((row) => {
      return row as User
    });
  }
}

export const init = () => {
  const connection = InitDatabase()

  return new UserRepository(connection)
}

export default init
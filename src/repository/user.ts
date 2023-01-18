import { Connection } from '@planetscale/database'
import { init as InitDatabase } from "../driver/database/planetscale"
import { User } from '../domain/entity/user'

export interface UserRepositoryInterface {
  getAll(): Promise<User[]>
  create(user: User): Promise<User>
  update(user: User): Promise<User>
}

export class UserRepository implements UserRepositoryInterface {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getAll(): Promise<User[]> {
    const results = await this.connection.execute('SELECT * FROM users')

    return results.rows.map((row) => {
      return row as User
    })
  }

  async create(user: User): Promise<User> {
    const query = "INSERT INTO users (`firstName`, `lastName`, `age`) VALUES (:firstName, :lastName, :age)"
    const results = await this.connection.execute(query, user)
    user.id = Number(results.insertId)

    return user
  }

  async update(user: User): Promise<User> {
    const query = "UPDATE users SET `firstName` = :firstName, `lastName` = :lastName, `age` = :age WHERE `id` = :id"
    this.connection.execute(query, user)

    return user
  }
}

export const init = () => {
  const connection = InitDatabase()

  return new UserRepository(connection)
}

export default init
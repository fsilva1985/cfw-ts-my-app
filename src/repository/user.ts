import { Connection } from '@planetscale/database'
import { init as InitDatabase } from '../driver/database/planetscale'
import { User } from '../domain/entity/user'

export interface UserRepositoryInterface {
  getById(userId: number): Promise<User>
  getAll(): Promise<User[]>
  create(user: User): Promise<User>
  update(user: User): Promise<any>
  delete(userId: number): Promise<any>
}

export class UserRepository implements UserRepositoryInterface {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getById(userId: number): Promise<User> {
    const results = await this.connection.execute('SELECT * FROM users WHERE id = :id', { id: userId })

    return results.rows[0] as User
  }

  async getAll(): Promise<User[]> {
    const results = await this.connection.execute('SELECT * FROM users')

    return results.rows.map((row) => {
      return row as User
    })
  }

  async create(user: User): Promise<User> {
    const results = await this.connection.execute('INSERT INTO users (`firstName`, `lastName`, `age`) VALUES (:firstName, :lastName, :age)', user)
    user.id = Number(results.insertId)

    return user
  }

  async update(user: User) {
    await this.connection.execute('UPDAT users SET `firstName` = :firstName, `lastName` = :lastName, `age` = :age WHERE `id` = :id', user)
  }

  async delete(userId: number): Promise<any> {
    await this.connection.execute('DELETE FROM users WHERE id = :id', { id: userId })
  }
}

export const init = () => {
  const connection = InitDatabase()

  return new UserRepository(connection)
}

export default init
import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UsersPolicy extends BasePolicy {
  public async index(user: User) {
    return user.rules === 'ROLE_ADMIN'
  }

  public async show(user: User, id: number) {
    return user.rules === 'ROLE_ADMIN' || user.id === id
  }

  public async update(user: User, id: number) {
    return user.rules === 'ROLE_ADMIN' || user.id === id
  }

  public async destroy(user: User, id: number) {
    return user.rules === 'ROLE_ADMIN' || user.id === id
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@adonis.com',
      password: 'Admin@12',
      rules: 'ROLE_ADMIN',
    })
  }
}

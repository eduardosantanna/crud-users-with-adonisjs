import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    const { limit, page, like } = request.only(['limit', 'page', 'like'])

    await bouncer.with('UsersPolicy').authorize('index')

    if (like !== '') {
      const usersFilter = await Database.from('users')
        .whereRaw(`first_name ILIKE '%${like}%'`)
        .orWhereRaw(`last_name ILIKE '%${like}%'`)
        .orWhereRaw(`email ILIKE '%${like}%'`)
        .select('id', 'first_name as firstName', 'last_name as lastName', 'email', 'rules')
        .paginate(page, limit)
      response.header('total', usersFilter.total)
      return response.ok(usersFilter.all())
    } else {
      const usersNoFilter = await Database.from('users')
        .select('id', 'first_name as firstName', 'last_name as lastName', 'email', 'rules')
        .paginate(page, limit)
      response.header('total', usersNoFilter.total)
      return response.ok(usersNoFilter.all())
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(UserValidator)
    const user: User = await User.create(userData)
    return response.ok(user.id)
  }

  public async show({ params, response, bouncer }: HttpContextContract) {
    const { id } = params as { id: number }
    await bouncer.with('UsersPolicy').authorize('show', Number(id))
    const user = await User.query()
      .where('id', `${id}`)
      .select('id', 'first_name', 'last_name', 'email', 'rules')
    if (user.length === 0) return response.notFound({ error: 'User not found.' })
    return response.ok(user)
  }

  public async update({ params, request, response, bouncer }) {
    const { id } = params as { id: number }
    await bouncer.with('UsersPolicy').authorize('update', Number(id))
    const userDataUpdate = await request.validate(UserUpdateValidator)
    const user = await User.find(id)
    if (!user) return response.notFound({ error: 'User not found.' })
    await user.merge(userDataUpdate).save()
    return response.ok(user.id)
  }

  public async destroy({ params, response, bouncer }) {
    const { id } = params as { id: number }
    await bouncer.with('UsersPolicy').authorize('destroy', Number(id))
    const user = await User.find(id)
    if (!user) return response.notFound({ error: 'User not found.' })
    await user.delete()
    return response.ok({ message: 'Deleted user.' })
  }
}

import Agenda from 'agenda'
import { checkDateService } from '../helpers/agenda'

export const startAgenda = () => {
  const address = `${process.env.MONGODB_URI}${process.env.MONGODB_NAME}`

  const agenda = new Agenda({
    db: {
      address,
      options: {
        auth: {
          username: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASSOWORD,
        },
      },
    },
  })

  agenda.define('checkDate', () => {
    checkDateService()
  })

  agenda.on('ready', () => {
    agenda.every('1 day', 'checkDate')
    agenda.start()
  })
}

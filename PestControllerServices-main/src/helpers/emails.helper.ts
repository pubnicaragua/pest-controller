import dayjs from 'dayjs'
import { prepareNodemailer } from '../config/nodemailer'
import { Service } from '../schemas/service/service.schema'
import { ScheduleServiceDTO } from '../schemas/service/service.dto'

export const sendTokenMail = async (token: number, emailTo: string) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Código de verificación',
    text: 'Su código de verificación es: ' + token + '\n\nEste código va a expirar dentro de 10 minutos.',
  }

  return prepareNodemailer(mailOptions)
}

export const sendUserRegisteredMail = async (emailTo: string) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Usted ha sido registado a PestController',
    text:
      'Ud ha sido registrado a PestController y ya puede ingresar al protal utilizando las siguientes crendenciales: \n\n' +
      'Correo electrónico: ' +
      emailTo +
      '\nContraseña: DEFAULT\n\n' +
      'Se le solicitará cambiar su contraseña por una mas segura y la cual solo ud debe conocer',
  }

  return prepareNodemailer(mailOptions)
}

export const sendClientRegisteredMail = async (emailTo: string) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Usted ha sido registado a PestController',
    text: 'Ud ha sido registrado a PestController para poder hacer uso de sus servicios',
  }

  return prepareNodemailer(mailOptions)
}

export const sendClientServiceScheduledMail = async (emailTo: string, service: ScheduleServiceDTO) => {
  const serviceDate = dayjs(service.serviceDate).format('DD MMMM YYYY')

  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Servicio agendado: ' + service.serviceType,
    text: `Se ha agendado un servicio de ${service.serviceType} con PestController para el ${serviceDate}`,
  }

  return prepareNodemailer(mailOptions)
}

export const sendTechnicalServiceScheduledMail = async (
  emailTo: string,
  client: string,
  service: ScheduleServiceDTO
) => {
  const serviceDate = dayjs(service.serviceDate).format('DD MMMM YYYY')

  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Servicio asignado: ' + service.serviceType,
    text:
      `Cliente: ${client}\n` +
      `Fecha: ${serviceDate}\n` +
      `Tipo de servicio: ${service.serviceType}\n` +
      `Urgencia: ${service.urgency}\n\n` +
      `Para mas información ingrese al sitio web donde se le mostrará los detalles del servicio`,
  }

  return prepareNodemailer(mailOptions)
}

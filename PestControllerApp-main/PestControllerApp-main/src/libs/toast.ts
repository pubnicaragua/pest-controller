import { DefaultToastOptions } from 'react-hot-toast'

export const toastOptions: DefaultToastOptions = {
  success: {
    style: {
      background: '#65a30d',
      color: '#ffffff',
      fontWeight: 'bold',
    },
  },
  error: {
    style: {
      background: '#dc2626',
      color: '#ffffff',
      fontWeight: 'bold',
    },
  },
  duration: 4000,
}

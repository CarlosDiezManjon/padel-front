import moment from 'moment'

export function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export function datetimeToStringMinutes(date) {
  if (!date) {
    return ''
  }
  date = new Date(date)
  const mes = ('' + (date.getMonth() + 1)).padStart(2, '0')
  const dia = ('' + date.getDate()).padStart(2, '0')
  const hora = ('' + date.getHours()).padStart(2, '0')
  const minuto = ('' + date.getMinutes()).padStart(2, '0')
  const dateStr = `${dia}/${mes}/${date.getFullYear()} ${hora}:${minuto}`

  return dateStr
}

export function datetimeToStringDate(date) {
  if (!date) {
    return ''
  }
  date = new Date(date)
  const mes = ('' + (date.getMonth() + 1)).padStart(2, '0')
  const dia = ('' + date.getDate()).padStart(2, '0')
  const dateStr = `${dia}/${mes}/${date.getFullYear()}`

  return dateStr
}

export function datetimeToStringTime(date) {
  if (!date) {
    return ''
  }
  date = new Date(date)
  console.log(date.toISOString())
  const hora = ('' + date.getHours()).padStart(2, '0')
  const minuto = ('' + date.getMinutes()).padStart(2, '0')
  const dateStr = `${hora}:${minuto}`

  return dateStr
}

export function localDateTimeToUTCDateTime(date) {
  if (!date) {
    return ''
  }

  const localDate = moment(date)
  const utcDateStr = localDate.utc().format()

  return utcDateStr
}

export function UTCDateTimeToLocalDateTime(date) {
  if (!date) {
    return ''
  }

  const utcDate = moment.utc(date)
  const localDateStr = utcDate.local().format('HH:mm')

  return localDateStr
}

export function localTimeToUTCTime(time) {
  if (!time) {
    return ''
  }

  const localTime = moment(time, 'HH:mm')
  const utcTimeStr = localTime.utc().format('HH:mm')

  return utcTimeStr
}

export function UTCTimeToLocalTime(time) {
  if (!time) {
    return ''
  }

  const utcTime = moment.utc(time, 'HH:mm')
  const localTimeStr = utcTime.local().format('HH:mm')

  return localTimeStr
}

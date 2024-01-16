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

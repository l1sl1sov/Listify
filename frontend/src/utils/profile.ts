export const validateUsername = (firstName: string, secondName: string) => {
  return firstName.length <= 50 && secondName.length <= 50
}

export const getInitials = (fullName: string) => {
  if (!fullName.trim()) return ''
  return fullName
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
}

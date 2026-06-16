export const fetchProfilePictureDataUri = async (imageUrl) => {
  if (!imageUrl) {
    return null
  }

  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      return null
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())

    return `data:${contentType};base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}

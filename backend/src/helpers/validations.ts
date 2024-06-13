const REGEX = {
  URL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
}

export const isUrl = (url: string) => {
  return REGEX.URL.test(url)
}
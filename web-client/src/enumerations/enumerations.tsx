/*
 * ENUMERATIONS
 * Enums allow us to organize a collection of related values. Think of them as
 * a class for values, wherein the value can only be a string , or number.
 *
 */

export enum ROUTES {
  login = '/',
  signup = '/signup',
  overview = '/overview',
  interpretes = '/interpretes',
  history = '/history',
  messages = '/messages',
  settings = '/settings',
}

export enum LOCAL_STORAGE_TEMPLATE {
  token = 'x-token',
}

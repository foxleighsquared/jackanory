export interface User {
  /**
   * The user's name
   */
  name: string;
  /**
   * The user's email address
   */
  email: string;
  /**
   * The users username
   */
  username: string;
  /**
   * The user's password (hashed)
   */
  password: string;
  /**
   * The user's id (uuid)
   */
  id: string;
}

export default User;

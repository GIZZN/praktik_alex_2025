interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export const registerUser = (email: string, password: string, name: string): boolean => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((user: User) => user.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const loginUser = (email: string, password: string): Omit<User, 'password'> | null => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _unused, ...userWithoutPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
}; 
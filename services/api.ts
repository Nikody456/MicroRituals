import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://microrituals-backend.onrender.com/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface CreateRitualData {
  title: string;
  description?: string;
  frequency: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.loadToken();
  }

  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem('auth_token');
      console.log('Loaded token:', this.token);
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  private async saveToken(token: string) {
    try {
      await AsyncStorage.setItem('auth_token', token);
      this.token = token;
      console.log('Saved token:', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    console.log(`Making request to ${endpoint}`, {
      headers,
      method: options.method || 'GET',
    });

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`API error for ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Response from ${endpoint}:`, data);
    return data;
  }

  async register(data: RegisterData) {
    console.log('Registering user:', { email: data.email, username: data.username });
    const response = await this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async login(data: LoginData) {
    console.log('Logging in user:', { email: data.email });
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.access_token) {
      await this.saveToken(response.access_token);
    }

    return response;
  }

  async getRituals() {
    return this.request('/rituals');
  }

  async createRitual(data: CreateRitualData) {
    return this.request('/rituals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async completeRitual(id: string, comment?: string) {
    return this.request(`/rituals/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  }

  async getProfile() {
    return this.request('/users/profile');
  }

  async logout() {
    await AsyncStorage.removeItem('auth_token');
    this.token = null;
  }
}

export const api = new ApiClient(); 
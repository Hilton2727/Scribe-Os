// src/serviece/api.service.ts
// API service for handling all API requests

export class ApiService {
  static baseUrl = 'http://localhost';

  // Example: GET request
  static async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.status}`);
    }
    return response.json();
  }

  // JSON POST request
  static async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof data === 'string' ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${url} failed: ${response.status}`);
    }
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text as any;
    }
  }

  // Form-urlencoded POST request (for PHP endpoints)
  static async postForm<T>(url: string, formData: string, extraHeaders: Record<string, string> = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        ...extraHeaders,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`POST (form) ${url} failed: ${response.status}`);
    }
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text as any;
    }
  }

  // Dedicated method for terminal.php API
  static async terminalCommand(cmd: string): Promise<string> {
    return this.postForm<string>('/api/terminal.php', `cmd=${encodeURIComponent(cmd)}`);
  }

  // List files and folders in a directory (defaults to root)
  static async listFiles(dir: string = ''): Promise<Array<{ name: string; type: string; size: string | number; modified: string }>> {
    const url = '/api/files.php' + (dir ? `?dir=${encodeURIComponent(dir)}` : '');
    return this.get(url);
  }
}

// Usage:
// ApiService.get('/api/endpoint')
// ApiService.post('/api/endpoint', { key: 'value' })
// ApiService.postForm('/api/terminal.php', 'cmd=ls') 
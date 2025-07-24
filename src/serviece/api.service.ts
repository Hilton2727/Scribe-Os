// API service for handling all API requests
// NOTE: VITE_APP_BASE_URL is injected at build time from the .env file in the project root.
// If you change the .env file, you MUST rebuild the app for changes to take effect.

export const API_BASE = import.meta.env.VITE_APP_BASE_URL || '';

export async function apiGet<T>(url: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${url}`);
    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('GET error:', error);
    throw error;
  }
}

export async function apiPost<T>(url: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
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
  } catch (error) {
    console.error('POST error:', error);
    throw error;
  }
}

export async function apiPostForm<T>(url: string, formData: string, extraHeaders: Record<string, string> = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
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
  } catch (error) {
    console.error('POST form error:', error);
    throw error;
  }
}

export async function terminalCommand(cmd: string): Promise<string> {
  return apiPostForm<string>('/api/terminal/terminal.php', `cmd=${encodeURIComponent(cmd)}`);
}

export async function listFiles(dir: string = ''): Promise<Array<{ name: string; type: string; size: string | number; modified: string }>> {
  const url = '/api/files/files.php' + (dir ? `?dir=${encodeURIComponent(dir)}` : '');
  return apiGet(url);
}

// Usage:
// import { apiGet, apiPost, apiPostForm, terminalCommand, listFiles } from './api.service';
// apiGet('/api/endpoint')
// apiPost('/api/endpoint', { key: 'value' })
// apiPostForm('/api/terminal.php', 'cmd=ls') 
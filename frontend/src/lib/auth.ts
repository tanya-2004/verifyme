const API_URL = "http://localhost:5000"; // Change if needed

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Invalid email or password");
  }
  // Store JWT token and session info in localStorage
  localStorage.setItem('verifyme_auth', JSON.stringify({
    email,
    token: data.access_token, // Store the JWT token
    time: Date.now()
  }));
}

export async function register(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to register");
  }
  // Optionally, you may want to auto-login after registration
  // localStorage.setItem('verifyme_auth', JSON.stringify({ email, time: Date.now() }));
}

export function logout(): void {
  localStorage.removeItem('verifyme_auth');
}

export function getAuthToken(): string | null {
  const authData = localStorage.getItem('verifyme_auth');
  if (!authData) return null;
  try {
    const { token } = JSON.parse(authData);
    return token || null;
  } catch {
    return null;
  }
}

export function checkAuth(): boolean {
  const authData = localStorage.getItem('verifyme_auth');
  if (!authData) return false;
  try {
    const { time, token } = JSON.parse(authData);
    const SESSION_DURATION = 60 * 60 * 1000;
    return !!token && Date.now() - time < SESSION_DURATION;
  } catch {
    return false;
  }
}
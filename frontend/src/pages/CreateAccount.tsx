// CreateAccount.tsx
import React, { useRef } from 'react';
import { BACKEND_BASE_PATH } from '../constants/Navigation'; // Ensure correct path

const createAccount = (username: string, email: string, password: string): Promise<any> => {
  return fetch(`${BACKEND_BASE_PATH}/create-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  .then(async (res) => {
    const jsonRes = await res.json();
    console.log("Account creation response:", jsonRes); // Log response
    return jsonRes;
  })
  .catch((err) => {
    console.log("Error during account creation:", err); // Log error
  });
};

const CreateAccount = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission refresh

    const username = usernameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    await createAccount(username, email, password); // Call function to create an account
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" ref={usernameRef} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" ref={passwordRef} />
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;

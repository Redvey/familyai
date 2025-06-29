"use client";

import { authClient } from "@/lib/auth-client"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
      },
      {
        onSuccess: () => {
          window.alert("User created successfully!");
          // window.location.href = "/dashboard"
        },
        onError: () => {
          window.alert(`Signup failed: "Unknown error"`);
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        onSuccess: () => {
          window.alert("User login successful!");
          // window.location.href = "/dashboard"
        },
        onError: () => {
          window.alert(`Login failed: "Unknown error"`);
        },
      }
    );
  };

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4 max-w-sm mx-auto mt-10">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4 max-w-sm mx-auto mt-10">
        <Input placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
        <Input placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4 max-w-sm mx-auto mt-10">
        <Input placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <Button onClick={onLogin}>Log In</Button>
      </div>
    </div>
  );
}

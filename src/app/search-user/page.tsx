"use client";
import { useState } from "react";

export default function SearchUserPage() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/search-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setMessage("");
      } else {
        setUser(null);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Lỗi khi tìm kiếm.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tìm kiếm người dùng</h1>
      <input
        type="email"
        placeholder="Nhập email người dùng"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Tìm</button>

      {message && <p>{message}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <h3>Thông tin người dùng:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

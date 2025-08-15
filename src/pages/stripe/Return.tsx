import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/session-status?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <section id="error">
        <p>Something went wrong: {error}</p>
        <a href="/checkout">Try again</a>
      </section>
    );
  }

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return (
    <section id="unknown-status">
      <p>Payment status: {status}</p>
      <a href="/checkout">Back to checkout</a>
    </section>
  );
};

export default Return;

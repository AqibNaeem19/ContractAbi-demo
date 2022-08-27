import React, { useEffect } from "react";

function Error({ error, setError }) {
  const delay = ms => new Promise(res => setTimeout(() => {
    setError({ status: false, message: "" });
    res();
  }, ms));


  useEffect(() => {
    const reset = async () => await delay(4000);
    reset();
  }, [error && !error.status]);

  if (!error.status) return <></>;

  return (
    <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
      {error.message}
    </div>
  );
}

export default Error;
export const Value1 = {message: 'someError'}
function AuthForm({ token, apiKey, setToken, setApiKey }) {
  return (
    <div className="row mt-2 mb-3">
      <div className="col-sm-6">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          id="token"
          className="form-control"
          placeholder="token"
        />
      </div>
      <div className="col-sm-6">
        <input
          type="text"
          id="apikey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="form-control"
          placeholder="apikey"
        />
      </div>
    </div>
  );
}

export default AuthForm;

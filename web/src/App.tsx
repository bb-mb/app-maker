import { ChangeEventHandler, useState } from "react";
import axios from "axios";

function App() {
  const [identifier, setIdentifier] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIdentifier(e.target.value);
  };

  const onSubmit = () => {
    axios.post("http://localhost:3001", { identifier });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-md form-control p-4 rounded-box mt-8 shadow-lg">
        <h1 className="text-2xl leading-none font-bold tracking-tight mb-4">
          create selleree app
        </h1>
        <label className="label">
          <span className="label-text">identifier</span>
        </label>
        <input
          type="text"
          placeholder="identifier"
          className="input input-bordered"
          value={identifier}
          onChange={onChange}
        />
        <button className="btn btn-primary mt-6" onClick={onSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

import InputForm from "./InputForm";
import format from "date-fns/format";
import React from "react";
import Loader from "./Loader";
import ResultTable from "./ResultTable";

function App() {
  // return <div inline-datepicker="true" data-date="02/25/2022"></div>
  const [rows, setRows] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (args) => {
    setLoading(true);
    setError(false);
    setRows(null);
    try {
      const resp = await fetch(
        `/api/find?start=${format(args.start, "yyyy-MM-dd")}&end=${format(
          args.end,
          "yyyy-MM-dd"
        )}`
      );
      const json = await resp.json();

      setLoading(false);
      if (json.status == "error") {
        setError(true);
      } else {
        setRows(json);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <InputForm onSubmit={handleSubmit} />
      {error && (
        <div
          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 ml-4 mr-4"
          role="alert"
        >
          <span class="font-medium">Unexpected error!</span> Change a few things
          up and try submitting again.
        </div>
      )}
      {loading && (
        <div className="m-4">
          <Loader />
        </div>
      )}
      {rows && <ResultTable rows={rows} />}
    </>
  );
  // return <RangePicker />;

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
        <p>
            Error occured<br />
            { error.statusText || error.message }
        </p>
    </div>
  );
}

export {
    ErrorPage
}
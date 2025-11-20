import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  var message


 if (isRouteErrorResponse(error)) {
    // Le añado todos los valores posibles de errores
    message = `${error} - ${error.status} - ${error.statusText}`;
  }

  return (
    <div id="error-page">
      <h1>Huepaaaa</h1>
      <p>Hubo un error</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}

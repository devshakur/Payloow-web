import { useRouteError } from "react-router-dom";
import '../components/AuthenticationPage/auth.css'
import { useRouter } from "../Routes/router";

 function ErrorPage() {
  const error = useRouteError();
  const router = useRouter()
  console.error(error);

  return (
    <div id="error-page" className="flex justify-center flex-col items-center bg h-screen w-screen overflow-y-auto text-white" >
      <div className="mb-4">
        <img src="/images/error.png" alt="error" />
      </div>
      <h1 className="font-plus-jakarta text-lg font-medium">Oops!</h1>
      <p className="font-plus-jakarta text-lg font-medium">Sorry, an unexpected error has occurred.</p>
      <p className='font-plus-jakarta text-lg font-medium'>
        <i>{error.statusText || error.message}</i>
      </p>
    <div className="mt-2">
      <button onClick={()=>router.back()} className="w-auto px-5 py-3 bg-blue-800 text-white rounded-lg shadow-lg">Go Back</button>
    </div>
    </div>
  );
}

export default ErrorPage;
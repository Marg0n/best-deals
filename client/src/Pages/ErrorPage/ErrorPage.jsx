import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
             <Helmet>
                <title>
                    Masala Manager | Error
                </title>
            </Helmet>
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <img src="https://img.freepik.com/premium-photo/wide-3d-illustration-404-error-webpage-concept-with-alert-signs-3d-rendering_670147-70058.jpg?w=1060" alt="" />
                <p className="text-3xl">Sorry, we could not find this page.</p>
                <Link to='/'>
                <button className="px-8 bg-orange-300 hover:bg-orange-500 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to homepage</button>
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import fetchIntercept from 'fetch-intercept';

const checkIfOwnApiUrl = (url: string): boolean => {
  const API_URL = process.env.REACT_APP_API_URL;
  let full_own_api_url = API_URL;
  if (API_URL === '/api' || API_URL === '/api/') {
    full_own_api_url = location.protocol + '//' + location.host + API_URL;
  }

  return url.startsWith(API_URL) || url.startsWith(full_own_api_url)
}

const AjaxInterceptor = () => {
    const location = useLocation();
    
    useEffect(() => {
        const unregister = fetchIntercept.register({ 
            request: function (url: any, config) {
                if (typeof url !== 'string' || !checkIfOwnApiUrl(url)) {
                    return [url, config]
                }
                
                if (!config) {
                    config = {};
                }
                // Disabled after using jwt...
                // Session is not compatible with Google Add on integration.
                // if (!config["credentials"]) {
                //     // This is essential !
                //     // Sending Credentials with a Fetch Request
                //     // We can persist cookie id with this option.
                //     // So we can be connected as session in server side...
                //     // https://web.dev/introduction-to-fetch/#sending-credentials-with-a-fetch-request
                //     config["credentials"] = 'include';
                // }
                if (!config.headers) {
                    config.headers = {};
                }
                if (!config.headers["X-Requested-With"]) {
                  // This flag does not include automatically, if you use 'fetch'
                  // It is added automatically only if you use jQuery Ajax.
                  // If this header is absent, req.xhr is not set on node.js server side.
                  config.headers["X-Requested-With"] = "XMLHttpRequest";
                }
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = 'application/json';
                }
                config.headers["Authorization"] = null; // Currently set null, no Authorization logic yet.
                return [url, config];
            },
            response: function (response) {
                // Modify the reponse object 
                // BEGIN AJAX_AUTH_CHECK
                if ( 
                  response.status === 401
                ) { 
                }
                // END AJAX_AUTH_CHECK
                return response;
            },
            responseError: function (error) {
                // console.log('Error on AJAX fetch')
                // console.error(error)
                // Handle an fetch error
                return Promise.reject(error);
            },
        });

        return () => { unregister() };
    }, []);

    return (<></>);
};

export default AjaxInterceptor;

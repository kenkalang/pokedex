import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

const handleUnauthorizedError = () => {
    window.location.href = '/';
};

export const wretchInstance = () =>
    wretch()
        .addon(FormDataAddon)
        .addon(QueryStringAddon)
        .catcher(401, handleUnauthorizedError)
        .catcher(400, (err) => window.alert(err))
        .catcher(500, (err) => window.alert(err));

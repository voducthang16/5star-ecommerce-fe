import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'contact';

const Contact = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const ContactService = {
    Contact,
};

export default ContactService;

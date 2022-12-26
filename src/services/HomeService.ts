import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
// let url: string = 'banner';

const GetBanner = () => {
    return AxiosInstance.get(Config.apiUrl + 'banner');
};

const HomeService = {
    GetBanner,
};

export default HomeService;

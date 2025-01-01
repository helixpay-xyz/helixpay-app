import CBConfig from 'configs/CBConfig';
import CBGlobal from 'globals/CBGlobal';
import CBService from 'services/CBService';

export default class CBBalance extends CBService {

    constructor() {
        super(CBConfig.ETHER_API_KEY);
    }

    getBalance(query, showLoading = true, showError = true) {
        return this.GET(`/v1/balance`, query, showLoading, showError);
    }

    //set API here
}

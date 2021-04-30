import VendorUtil from '../utils/VendorUtil';

export default class TransferService {
  public static async getJeniusBankList() {
    const jenius = await VendorUtil.jenius();
    const bankList = jenius.bankService.getList();
    return bankList
  }
}

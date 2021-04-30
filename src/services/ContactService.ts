import VendorUtil from '../utils/VendorUtil';

export default class ContactService {
  public static async getJeniusContact(
    keyword?: string,
    limit?: number,
    offset?: number,
  ) {
    const jenius = await VendorUtil.jenius();
    const bankList = jenius.contactService.getList(keyword, offset, limit);
    return bankList;
  }
}

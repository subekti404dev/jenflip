import VendorUtil from '../utils/VendorUtil';

export default class UserService {
  public static async getUser() {
    const flip = await VendorUtil.flip();
    const jenius = await VendorUtil.jenius();

    const promises = [
      flip.userService.getInfo(),
      jenius.userService.getData(),
      jenius.cardService.getData(),
    ];

    const [flipUser, jeniusUser, jeniusCard] = await Promise.all(promises);
    return {flipUser, jeniusUser, jeniusCard};
  }
}

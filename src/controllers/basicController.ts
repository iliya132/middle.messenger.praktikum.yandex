export default abstract class BasicController {
  protected changeState: (pathname: string, value: unknown) => void;

  constructor(changeStateAction: (pathname: string, value: unknown) => void) {
    this.changeState = changeStateAction;
  }
}

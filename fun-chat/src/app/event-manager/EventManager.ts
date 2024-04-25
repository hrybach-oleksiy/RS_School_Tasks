export default class EventManager {
  private loginSubmitEventCallback: (() => void) | null = null;

  private sendMessageEventCallback: ((event: Event) => void) | null = null;

  private useLoginSubmitEventCallback: boolean = true;

  constructor() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.useLoginSubmitEventCallback && this.loginSubmitEventCallback && window.location.hash === '#login') {
        this.loginSubmitEventCallback();
      }

      if (!this.useLoginSubmitEventCallback && this.sendMessageEventCallback) {
        this.sendMessageEventCallback(event);
      }
    }
  };

  public setUseLoginSubmitEventCallback = (useLoginSubmit: boolean) => {
    this.useLoginSubmitEventCallback = useLoginSubmit;
  };

  public setLoginSubmitEventCallback = (callback: () => void) => {
    this.loginSubmitEventCallback = callback;
  };

  public setSendMessageEventCallback = (callback: (event: Event) => void) => {
    this.sendMessageEventCallback = callback;
  };
}

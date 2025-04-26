type Callback = (data: string) => void;

export class User {
  id: string;
  count = 1;
  constructor(id: string) {
    this.id = id;
  }

  fetchData(cb: Callback, delay: number) {
    setTimeout(() => {
      cb(`data: ${this.id}`);
    }, delay);
  }

  useInterval() {
    setInterval(() => {
      // eslint-disable-next-line no-console
      console.log('animation');
    }, 100);
  }

  useMultiTimer() {
    setTimeout(() => {
      setInterval(() => {
        // eslint-disable-next-line no-console
        console.log('trigger');
      }, 100);
    }, 1000);
  }

  usePromise() {
    return new Promise((resolve) => {
      resolve(1);
    });
  }

  usePromiseWithTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 100);
    });
  }

  useNestedPromise() {
    Promise.resolve().then(() => {
      this.count = 2;
    }).then(() => {
      this.count = 3;
    });
  }
}

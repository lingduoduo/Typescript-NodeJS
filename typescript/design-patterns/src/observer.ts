interface Observer<T> {    
    update: (value: T) => void;
}

class Subject {
    private observers: Observer<string>[] = [];

    addObserver(observer: Observer<string>) {
        this.observers.push(observer);
    }

    notify(value: string) {
        this.observers.forEach(observer => observer.update(value));
    }
}

class LogObserver implements Observer<string> {
    update(value: string) {
        console.log(`LogObserver: ${value}`);
    }
}

let observer1 = new LogObserver();
let observer2 = new LogObserver();
let observer3 = new LogObserver();

let subject = new Subject();
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

subject.notify('Hello World');
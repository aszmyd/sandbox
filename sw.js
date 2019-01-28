self.addEventListener("fetch", event => {
    let url = new URL(event.request.url);

    const test = () => {
        fetch(`https://dev.horn.co/api/v1_0/version`);
    };

    console.log('url', url);

    if (url.pathname.indexOf("test-once") !== -1) {
        test();
        event.respondWith(new Response("Test finished..."));
    }

    if (url.pathname.indexOf("make-tests") !== -1) {
        console.log('handle test');
        event.respondWith(new Response("Starting test..."));

        let keepAliveCounter = 0;
        const sendRequest = () => {
            keepAliveCounter++;
            test();
        };

        sendRequest();
        setInterval(() => {
            sendRequest();
        }, 1000)

    }
});
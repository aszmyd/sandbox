self.addEventListener("fetch", event => {
    let url = new URL(event.request.url);
    if (url.pathname.startsWith("/initialize")) {
        console.log('handle test');
        event.respondWith(new Response("Starting test..."));

        let keepAliveCounter = 0;
        const sendRequest = () => {
            keepAliveCounter++;
            console.log('SEND ' + keepAliveCounter);
            fetch(`https://dev.horn.co/api/v1_0/version`);
        };

        sendRequest();
        setInterval(() => {
            sendRequest();
        }, 1000)

    }
});
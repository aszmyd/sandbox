self.addEventListener("fetch", event => {
    let url = new URL(event.request.url);
    if (url.pathname.startsWith("/initialize")) {
        console.log('handle test');
        event.respondWith(new Response("Starting test..."));

        let keepAliveCounter = 0;
        const sendRequest = () => {
            keepAliveCounter++;
            console.log('SEND ' + keepAliveCounter);
            fetch(`https://192.168.50.14:8080/rest`);
        };

        sendRequest();
        setInterval(() => {
            sendRequest();
        }, 1000)

    }
});
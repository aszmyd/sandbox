((root) => {
    let wsConnection;
    let keepAliveCounter = 0;
    const host = 'https://aszmyd.github.io/sandbox/';

    const connectWebSocket = () => {

        const sendKeepAlive = () => {
            keepAliveCounter++;
            wsConnection.send(JSON.stringify({
                type: 'client_alive',
                count: keepAliveCounter
            }))
        };

        wsConnection = new WebSocket(`wss://${host}/`, 'echo-protocol');
        console.log('Connecting...');
        wsConnection.addEventListener('open', () => {
            console.log('WebSocket opened');
            console.log('test');
            setInterval(() => {
                sendKeepAlive();
            }, 1000);
        });
        wsConnection.addEventListener('close', (e) => {
            console.log('WebSocket closed!!!');
            console.log(e);
        });
        wsConnection.addEventListener('error', () => {
            console.error('WebSocket error!!!');
        });
        wsConnection.addEventListener('message', (event) => {
            console.log(`Received: ${event.data}`)
        });
    };

    const startRestTest = () => {

        const sendRequest = () => {
            keepAliveCounter++;
            console.log('SEND ' + keepAliveCounter);
            fetch(`http://${host}/rest`);
        };

        sendRequest();
        setInterval(() => {
            sendRequest();
        }, 1000)
    };

    const startServiceWorkerTest = () => {

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then((response) => {
                // Service worker registration done
                console.log('Registration Successful', response);
                fetch("initialize");
            }).catch((error) => {
                // Service worker registration failed
                console.log('Registration Failed', error);
            });
        } else {
            console.log('No SW support');
        }
    };

    root.connectWebSocket = connectWebSocket;
    root.startRestTest = startRestTest;
    root.startServiceWorkerTest = startServiceWorkerTest;


})(window);
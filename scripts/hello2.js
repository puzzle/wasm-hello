(function () {

    function strlen(string) {
        for (end = string; heap[end]; end++);
        return end - string;
    }

    function printMessage(message) {
        var string = new TextDecoder('utf-8').decode(heap.slice(message, message + strlen(message)));
        document.getElementById("message2").innerHTML = string
    }

    var memory = new WebAssembly.Memory({ initial: 2, maximum: 10 });
    var heap = new Uint8Array(memory.buffer);
    var importObject = {
        env: {
            memory,
            printMessage
        }
    };

    WebAssembly.instantiateStreaming(fetch('wasm/hello2.wasm'), importObject)
        .then(module => { module.instance.exports.hello() });

}());

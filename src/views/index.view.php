<script async>
    function increment() {
        const counterElement = globalThis.$refs['counter'];
        let currentValue = parseInt(counterElement.textContent, 10);
        currentValue += 1;
        counterElement.textContent = currentValue;
    }

    // function decrement() {
    //     let currentValue = parseInt(counterElement.textContent, 10);
    //     currentValue -= 1;
    //     counterElement.textContent = currentValue;
    // }

    // function doubleCounter() {
    //     return parseInt(counterElement.textContent, 10) * 2;
    // }
</script>
<main>
    <button click="increment" target="counter">Increment</button>
    <div ref="counter">0</div>
    <div computed="doubleCounter">0</div>
</main>
<main>
    <button click="increment" targetRefs="counter">Increment</button>
    <div ref="counter">0</div>
    <div computed="doubleCounter">0</div>
</main>
<script>
    function increment() {
        let counterElement = $refs['counter'];
        let currentValue = parseInt(counterElement.textContent, 10);
        currentValue += 1;
        counterElement.textContent = currentValue;
    }
    function decrement() {
        let counterElement = $refs['counter'];
        let currentValue = parseInt(counterElement.textContent, 10);
        currentValue -= 1;
        counterElement.textContent = currentValue;
    }

    function doubleCounter () {
        return parseInt($refs['counter'].textContent, 10) * 2;
    }
</script>
document.addEventListener('DOMContentLoaded', () => {

    // Assign refs to the elements with 'ref' attribute
    // This allows us to access these elements globally via globalThis object
    // e.g., globalThis.counter for the element with ref="counter"
    globalThis.refs = {};

    // create proxy for refs to allow dynamic updates
    globalThis.$refs = new Proxy(refs, {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            }
            console.warn(`Reference "${prop}" not found.`);
            return null;
        },
        set(target, prop, value) {
            target[prop] = value;
            // Optionally, you can log or handle the update
            console.log(`Reference "${prop}" set to`, value);
            // update computed properties if necessary
            // e.g., if you have a computed property that depends on this ref
            // target[prop].computedProperty = computeSomething(value);
            // You can also trigger a re-render or update UI if needed
            // For example, if this ref is a DOM element, you might want to update its content
            if (value instanceof HTMLElement) {
                value.textContent = value.textContent; // force re-render
            }
            // If you have computed properties that depend on this ref, you can update them here
            // return true to indicate success
            return true;
        }
    });

    const reffedElements = document.querySelectorAll('[ref]');
    reffedElements.forEach(refEl => {
        const refName = refEl.getAttribute('ref');
        if (refName)
            $refs[refName] = refEl;
    });

    // globalThis.computed = {};
    // // Assign computed properties to the elements with 'computed' attribute
    // // This allows us to define reactive properties that can be used in the template
    // const computedElements = document.querySelectorAll('[computed]');
    // computedElements.forEach(computedEl => {
    //     const computedName = computedEl.getAttribute('computed');
    //     if (computedName) {
    //         globalThis.computed[computedName] = computedEl;
    //     }
    // });
    // Assign click handlers to elements with 'click' attribute
    // This allows us to call functions defined in the global scope
    // e.g., clicking an element with click="increment" will call globalThis.increment()
    const clickElements = document.querySelectorAll('[click]');
    clickElements.forEach(clickEl => {
        const clickHandler = clickEl.getAttribute('click');
        if (clickHandler && typeof globalThis[clickHandler] === 'function') {
            clickEl.addEventListener('click', globalThis[clickHandler]);
        }
    });
});
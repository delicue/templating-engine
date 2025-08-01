document.addEventListener('DOMContentLoaded', () => {
    // Assign refs to the elements with 'ref' attribute
    // This allows us to access these elements globally via window object
    // e.g., window.counter for the element with ref="counter"
    window.refs = {};

    // create proxy for refs to allow dynamic updates
    window.$refs = new Proxy(refs, {
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

    const computedElements = document.querySelectorAll('[computed]');
    computedElements.forEach(computedEl => {
        const computedName = computedEl.getAttribute('computed');
        if (computedName && typeof window[computedName] === 'function') {
            // Create a computed property that updates when the ref changes
            Object.defineProperty($refs, computedName, {
                get: () => {
                    return window[computedName]();
                },
                set: (value) => {
                    console.warn(`Computed property "${computedName}" is read-only.`);
                }
            });
        } else {
            console.warn(`Computed property "${computedName}" is not defined.`);
        }
    });

    const reffedElements = document.querySelectorAll('[ref]');
    reffedElements.forEach(refEl => {
        const refName = refEl.getAttribute('ref');
        if (refName) {
            $refs[refName] = refEl;
        }
    });

    // function updateComputedRefs() {
    //     Object.keys($computedRef).forEach(key => {
    //         $computedRef[key] = eval($computedRef[key]);
    //     });
    // }

    // Assign click handlers to elements with 'click' attribute
    // This allows us to call functions defined in the global scope
    // e.g., clicking an element with click="increment" will call window.increment()
    const clickElements = document.querySelectorAll('[click]');
    clickElements.forEach(clickEl => {
        const clickHandler = clickEl.getAttribute('click');
        if (clickHandler && typeof window[clickHandler] === 'function') {
            clickEl.addEventListener('click', window[clickHandler]);
        }
    });
});
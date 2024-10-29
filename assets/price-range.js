if (!customElements.get('price-range')) {
    customElements.define(
        'price-range',
        class PriceRange extends HTMLElement {
            constructor() {
                super();
                this.stepsSlider = this.querySelector('#range-slider');
                this.inputs = this.querySelectorAll('input[type="number"]');

                this.inputs.forEach((element, index) => {
                    element.addEventListener('change', this.onRangeChange.bind(this, index));
                    element.addEventListener('keydown', this.onKeyDown.bind(this, index));
                });
                this.setMinAndMaxValues();
                this.onStepsSlider(this.stepsSlider);
            }

            onStepsSlider(stepsSlider) {
                const max_value = Number(stepsSlider.getAttribute('data-max-slider'));
                const inputsArray = this.inputs;
                const minInput = inputsArray[0].value === '' ? 0 : Number(inputsArray[0].value.replace(',', ''));
                const maxInput = inputsArray[1].value === '' ? max_value : Number(inputsArray[1].value.replace(',', ''));

                noUiSlider.create(stepsSlider, {
                    start: [minInput, maxInput],
                    connect: true,
                    tooltips: false,
                    range: {
                        'min': [0],
                        'max': max_value
                    }
                });

                this.stepsSlider.noUiSlider.on('change', function (values, index) {
                    if (values[index] && values[index] !== inputsArray[index].value) {
                        inputsArray[index].value = values[index];
                        inputsArray[index].dispatchEvent(new Event('input', {bubbles: true}))
                    }
                });

            }

            onRangeChange(index, event) {
                this.stepsSlider.noUiSlider.setHandle(index, event.target.value);
                this.adjustToValidValues(event.currentTarget);
                this.setMinAndMaxValues();
            }

            onKeyDown(index, event) {
                if (event.metaKey) return;
                const values = this.stepsSlider.noUiSlider.get();
                const value = Number(values[index]);

                // [[index0_down, index0_up], [index1_down, index1_up]]
                const steps = this.stepsSlider.noUiSlider.steps();

                // [down, up]
                const step = steps[index];

                let position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (event.which) {
                    case 13:
                        this.stepsSlider.noUiSlider.setHandle(index, event.target.value);
                        break;

                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            this.stepsSlider.noUiSlider.setHandle(index, value + position);
                        }
                        break;

                    case 40:
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            this.stepsSlider.noUiSlider.setHandle(index, value - position);
                        }
                        break;
                }
                const pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
                if (!event.key.match(pattern)) event.preventDefault();
            }

            setMinAndMaxValues() {
                const inputs = this.querySelectorAll('input[type="number"]');
                const minInput = inputs[0];
                const maxInput = inputs[1];

                if (maxInput.value) minInput.setAttribute('data-max', maxInput.value);
                if (minInput.value) maxInput.setAttribute('data-min', minInput.value);
                if (minInput.value === '') maxInput.setAttribute('data-min', 0);
                if (maxInput.value === '') minInput.setAttribute('data-max', maxInput.getAttribute('data-max'));
            }

            adjustToValidValues(input) {
                const value = Number(input.value);
                const min = Number(input.getAttribute('data-min'));
                const max = Number(input.getAttribute('data-max'));

                if (value < min) input.value = min;
                if (value > max) input.value = max;
            }
        })
}


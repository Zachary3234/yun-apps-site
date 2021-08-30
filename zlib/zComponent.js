// Define zComponent
const zComponent = (function () {
    // Check jQuery.js include
    if (typeof (jQuery) == 'undefined') {
        console.log('jQuery not included!');
        return {};
    }
    // initialize zComponent
    var template,style,script;

    // return zComponent object
    return {
        import: function (src) {
            $.ajax({
                type: "get",
                url: src,
                async: true,
                dataType: 'html',
                success: function (data) {
                    template = null;
                    style = null;
                    script = null;
                    $(data).each(function (ind, ele) {
                        switch (this.tagName) {
                            case 'TEMPLATE':
                                template = this;
                                break;
                            case 'SCRIPT':
                                script = this;
                                break;
                            case 'STYLE':
                                style = this;
                                break;
                        }
                    });
                    script ? Function(script.innerHTML)() : console.log('Tag script not found');
                },
                error: function (err) {
                    console.log("Failed to load: ", src);
                }
            });
        },
        register: function (name, obj) {
            customElements.define(name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        // Create shadowRoot
                        const shadow = this.attachShadow({ mode: 'open' });

                        // Append template
                        $(shadow).append($(template ? template.innerHTML : ""));

                        // Append style
                        let styleEle = document.createElement('style');
                        styleEle.textContent = style ? style.innerHTML : "";
                        shadow.appendChild(styleEle);

                        // Run script in template
                    }

                    static get observedAttributes() {
                        return ['text'];
                    }

                    attributeChangedCallback(attr, oldVal, newVal) {
                        switch (attr) {
                            case 'text':
                            // this.shadowRoot.innerHTML = newVal;
                        }
                    }

                    connectedCallback() {
                        // here the element has been inserted into the DOM
                        // $(this.shadowRoot).append(this.template);
                        this.shadowRoot.querySelectorAll("[x-data]").forEach((t => {
                            window.Alpine.initializeComponent(t);
                        }))
                    }
                });
        }
    }
})();
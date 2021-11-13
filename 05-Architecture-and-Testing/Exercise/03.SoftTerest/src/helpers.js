function createElement(tag, attributes, ...content) {
    const element = document.createElement(tag);

    for (let [attribute, value] of Object.entries(attributes || {})) {
        if (attribute.substring(0, 2) === 'on') {
            element.addEventListener(attribute.substring(2).toLowerCase(), value);
        } else if (attribute.substring(0, 8) === 'dataset.') {
            element.setAttribute('data-' + attribute.substring(8), value);
        } else {
            element[attribute] = value;
        }
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}

export default {createElement};
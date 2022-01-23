const createElement = (tag, { props, children } = {}) =>
{
	const element = document.createElement(tag);

	if (props)
	{
		for (const [mainKey, mainValue] of Object.entries(props))
		{
			if (mainKey === 'style')
			{
				for (const [style, value] of Object.entries(props.style))
				{
					element.style.setProperty(style, value);
				}
			}
			else if (typeof mainValue !== 'function') element.setAttribute(mainKey, mainValue);
			else element[mainKey] = mainValue;
		}
	}

	if (children && children.length > 0)
	{
		element.append(...children);
	}

	return element;
}

module.exports = createElement;

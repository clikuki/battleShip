const createElement = require('./createElement');

const showModal = () => modalBackdrop.classList.remove('hide');
const hideModal = () => modalBackdrop.classList.add('hide');
const modalFuncs = {
	show: (allowModalExit, headerTitle, ...bodyContents) =>
	{
		if (!allowModalExit)
		{
			modalCloseBtn.remove();
			modalBackdrop.onclick = null;
		}
		else
		{
			modal.append(modalCloseBtn);
			modalBackdrop.onclick = modalFuncs.hide;
		}

		const header = createElement('h2', {
			children: [
				headerTitle,
			],
			props: {
				class: 'header',
			}
		})

		const body = createElement('div', {
			props: {
				class: 'body',
			},
			children: bodyContents,
		})

		modalContent.replaceChildren(header, body);
		document.body.append(modalBackdrop);
		showModal();
	},
	hide: () =>
	{
		hideModal();
	},
};

const modalCloseBtn = createElement('button', {
	props: {
		class: 'modalCloseBtn',
		onclick: modalFuncs.hide,
	},
})

const modalContent = createElement('div', {
	props: {
		class: 'modalContent',
	},
})

const modal = createElement('div', {
	props: {
		class: 'modal',
		onclick: (ev) => ev.stopPropagation(),
	},
	children: [
		modalCloseBtn,
		modalContent,
	]
})

const modalBackdrop = createElement('div', {
	props: {
		class: 'modalBackdrop',
		onclick: modalFuncs.hide,
	},
	children: [
		modal,
	]
})

module.exports = modalFuncs;

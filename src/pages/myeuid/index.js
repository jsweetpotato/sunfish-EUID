import { getNode, getNodes } from '../../lib';

const logoutModal = getNode('#logoutModal');
const logoutButton = getNode('#logoutButton');
const withdrawModal = getNode('#withdrawModal');
const withdrawButton = getNode('#withdrawButton');
const closeModalButton = getNodes('.closeModalButton');
const modals = getNodes('.modal');

function showLogoutModal() {
  logoutModal.showModal();
}
logoutButton.addEventListener('click', showLogoutModal);

function showWithdrawModal() {
  withdrawModal.showModal();
}
withdrawButton.addEventListener('click', showWithdrawModal);

function closeModal() {
  modals.forEach((modal) => {
    modal.close();
  });
}

closeModalButton.forEach((button) => {
  button.addEventListener('click', closeModal);
});

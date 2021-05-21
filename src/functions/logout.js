export default function logout() {
  localStorage.clear();
  document.location.href = "/";
}
